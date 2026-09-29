import os

def replace_in_file(filepath, old, new):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return
        
    if old in content:
        content = content.replace(old, new)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

def process_dir(directory):
    for root, dirs, files in os.walk(directory):
        if '.git' in root or 'node_modules' in root or 'venv' in root:
            continue
        for file in files:
            if file.endswith(('.py', '.ts', '.tsx', '.html', '.md', '.toml', '.json', '.sh', '.conf', '.txt', 'Dockerfile', '.dev', '.webmanifest')):
                filepath = os.path.join(root, file)
                replace_in_file(filepath, "NexusRAG", "NexusRAG")
                replace_in_file(filepath, "NexusRAG", "NexusRAG")

if __name__ == "__main__":
    process_dir(r"c:\Users\nmheb\Downloads\RAG-NexusRAG-master")
