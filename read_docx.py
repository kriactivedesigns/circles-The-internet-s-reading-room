import zipfile
import xml.etree.ElementTree as ET
import sys

def read_docx(file_path):
    with zipfile.ZipFile(file_path, 'r') as docx:
        content = docx.read('word/document.xml')
        tree = ET.fromstring(content)
        
        ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        
        paragraphs = []
        for p in tree.iterfind('.//w:p', ns):
            texts = [node.text for node in p.iterfind('.//w:t', ns) if node.text]
            if texts:
                paragraphs.append(''.join(texts))
                
        return '\n'.join(paragraphs)

if __name__ == '__main__':
    import sys
    sys.stdout.reconfigure(encoding='utf-8')
    print(read_docx(sys.argv[1]))
