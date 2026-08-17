from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path.cwd().resolve()


class ReferenceParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: set[str] = set()
        self.references: list[tuple[str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self._record_attributes(tag, attrs)

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self._record_attributes(tag, attrs)

    def _record_attributes(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        for name, value in attrs:
            if not value:
                continue
            if name == "id":
                self.ids.add(value)
            if name in {"href", "src"}:
                self.references.append((tag, value))


def parse_html(path: Path) -> ReferenceParser:
    parser = ReferenceParser()
    parser.feed(path.read_text(encoding="utf-8"))
    parser.close()
    return parser


def resolve_reference(source: Path, reference: str) -> Path | None:
    parsed = urlsplit(reference)
    if parsed.scheme or parsed.netloc or reference.startswith("//"):
        return None
    if not parsed.path:
        return source

    decoded_path = unquote(parsed.path)
    target = ROOT / decoded_path.lstrip("/") if decoded_path.startswith("/") else source.parent / decoded_path
    target = target.resolve()
    if target.is_dir():
        target = target / "index.html"
    return target


def main() -> int:
    html_files = sorted(path for path in ROOT.rglob("*.html") if ".git" not in path.parts)
    parsed_files = {path.resolve(): parse_html(path) for path in html_files}
    errors: list[str] = []

    for source, parser in parsed_files.items():
        for tag, reference in parser.references:
            target = resolve_reference(source, reference)
            if target is None:
                continue
            if not target.exists():
                errors.append(f"{source.relative_to(ROOT)}: <{tag}> references missing file: {reference}")
                continue

            fragment = unquote(urlsplit(reference).fragment)
            target_parser = parsed_files.get(target.resolve())
            if fragment and target_parser is not None and fragment not in target_parser.ids:
                errors.append(f"{source.relative_to(ROOT)}: missing fragment #{fragment} in {target.relative_to(ROOT)}")

    if errors:
        print("Local reference validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"Checked local references in {len(html_files)} HTML files.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
