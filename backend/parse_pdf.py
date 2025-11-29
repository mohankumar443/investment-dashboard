import PyPDF2
import sys

pdf_path = sys.argv[1]

with open(pdf_path, 'rb') as file:
    pdf_reader = PyPDF2.PdfReader(file)
    print(f"Total pages: {len(pdf_reader.pages)}")
    print("\n" + "="*80)
    
    for i, page in enumerate(pdf_reader.pages):
        print(f"\n--- Page {i+1} ---")
        text = page.extract_text()
        print(text[:2000])  # Print first 2000 chars of each page
        print("\n" + "="*80)
