
import os

root_dir = "./form"  # change this
output_file = "./form/output.txt"

with open(output_file, "w", encoding="utf-8") as out:

    for folder, subfolders, files in os.walk(root_dir):
        for file in files:
            file_path = os.path.join(folder, file)

            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()

                out.write(f"\n\n===== {file_path} =====\n\n")
                out.write(content)

            except Exception as e:
                # skip binary files or unreadable files
                out.write(f"\n\n===== {file_path} (SKIPPED: {e}) =====\n")
