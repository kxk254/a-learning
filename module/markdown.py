# python generate_structure.py ./module . ./module PROJECT_STRUCTURE.md

import os
from pathlib import Path
import argparse


def generate_directory_tree(root_dir: str, max_depth: int = None, ignore_dirs=None):
    if ignore_dirs is None:
        ignore_dirs = {".git", "__pycache__", "venv", "node_modules", ".pytest_cache"}

    tree_lines = []
    explanations = {}  # folder/file -> reason

    def walk(path: Path, prefix: str = "", depth: int = 0):
        if max_depth is not None and depth > max_depth:
            return

        # Sort directories first, then files
        items = sorted(path.iterdir(), key=lambda x: (x.is_file(), x.name.lower()))

        for i, item in enumerate(items):
            if item.name in ignore_dirs or item.name.startswith("."):
                continue

            is_last = i == len(items) - 1
            connector = "└── " if is_last else "├── "
            rel_path = str(item.relative_to(root_dir))

            if item.is_dir():
                tree_lines.append(f"{prefix}{connector}📁 {item.name}/")
                new_prefix = prefix + ("    " if is_last else "│   ")
                walk(item, new_prefix, depth + 1)
            else:
                tree_lines.append(f"{prefix}{connector}📄 {item.name}")

                # Example: Add default explanations (customize this!)
                if "README" in item.name:
                    explanations[rel_path] = "Project documentation and overview"
                elif item.suffix in {".py"}:
                    explanations[rel_path] = "Python source code"

    root_path = Path(root_dir)
    tree_lines.append(f"📂 {root_path.name}/")
    walk(root_path)

    # Build Markdown output
    md = ["# Project Directory Structure\n", "```"]
    md.extend(tree_lines)
    md.append("```")

    # Add Explanations section
    md.append("\n## Folder & File Explanations\n")
    for path, reason in sorted(explanations.items()):
        md.append(f"- `{path}`: {reason}")

    return "\n".join(md)


# Usage
if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", default=".", help="Root directory")
    parser.add_argument("--output", default="PROJECT_STRUCTURE.md", help="Output file")
    parser.add_argument("--depth", type=int, default=None, help="Max depth")
    args = parser.parse_args()

    content = generate_directory_tree(args.root, args.depth)
    with open(args.output, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"✅ Structure saved to {args.output}")
