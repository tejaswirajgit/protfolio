#!/usr/bin/env python3
"""
Convert Jupyter notebooks to HTML for portfolio website
"""

import subprocess
import os
import sys

# Check if nbconvert is installed
try:
    import nbconvert
except ImportError:
    print("Installing nbconvert...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "nbconvert", "-q"])

from nbconvert import HTMLExporter

# Create notebooks directory if it doesn't exist
notebooks_dir = "notebooks"
if not os.path.exists(notebooks_dir):
    os.makedirs(notebooks_dir)
    print(f"Created {notebooks_dir} directory")

# Define notebooks to convert
notebooks = [
    "coronary-artery-disease.ipynb",
    "Plant Leaf Disease Detection.ipynb",
    "ML-Based Cardiovascular Disease Prediction & Prevention Framework.ipynb"
]

# Convert notebooks to HTML
html_exporter = HTMLExporter()
html_exporter.template_name = 'classic'

for notebook in notebooks:
    if os.path.exists(notebook):
        try:
            print(f"\nConverting {notebook}...")
            body, resources = html_exporter.from_filename(notebook)
            
            # Create output filename
            output_name = notebook.replace(".ipynb", ".html")
            output_path = os.path.join(notebooks_dir, output_name)
            
            # Write HTML file
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(body)
            
            print(f"✓ Converted: {output_path}")
        except Exception as e:
            print(f"✗ Error converting {notebook}: {e}")
    else:
        print(f"✗ File not found: {notebook}")

print("\n✓ Conversion complete! Notebooks are ready for your portfolio.")
print(f"HTML files saved in: {notebooks_dir}/")
