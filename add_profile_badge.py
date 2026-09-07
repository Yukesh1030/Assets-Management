import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html') and (f.startswith('Admin') or f in ['ClientDashboard.html', 'Performance.html', 'Documents.html', 'Funding.html', 'AdvisorMessages.html', 'Settings.html'])]

profile_html = """
                    <div class="user-profile-badge" style="display:flex; align-items:center; gap:10px; background:#fff; padding:6px 12px 6px 6px; border-radius:24px; border:1px solid #eee; box-shadow:0 2px 5px rgba(0,0,0,0.02);">
                        <div style="width:32px; height:32px; border-radius:50%; background:#1A3C34; color:#fff; display:flex; align-items:center; justify-content:center; font-size:14px;"><i class="fas fa-user"></i></div>
                        <span class="dynamic-username-display" style="font-size:13px; font-weight:600; color:#333;">User</span>
                    </div>"""

js_snippet = """
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const username = localStorage.getItem('stackly_username') || 'Alex Johnson';
            document.querySelectorAll('.dynamic-username-display').forEach(el => {
                el.textContent = username;
            });
        });
    </script>
"""

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the top-header or page-header right-side div
    # It usually looks like:
    # <div class="top-header">
    #     <div>...</div>
    #     <div>
    #         <button>...</button>
    #     </div>
    # </div>
    
    # We can replace the second <div> inside the header with <div style="display:flex; gap:16px; align-items:center;"> + profile_html + original button
    
    # Let's find the headers
    def replace_header(match):
        header_start = match.group(1) # <div class="top-header...">
        content_inside = match.group(2)
        
        # Now find the last <div> inside the header that contains buttons
        # Since it's generally <div>...</div><div><button>...</div>
        # Let's split by '<div' and look for the last one
        
        # A simpler way is to just inject the profile_html at the very top right of the .main-content
        # or just right before the first button in the top-header
        
        # If there's an action div:
        action_div_match = re.search(r'(<div>\s*<(a|button)[^>]+class="btn[^>]+>.*?</(a|button)>\s*</div>)', content_inside, re.DOTALL)
        if action_div_match:
            original_div = action_div_match.group(1)
            # Add flex style to the div if not present and insert profile_html
            new_div = original_div.replace('<div>', '<div style="display:flex; align-items:center; gap:16px;">' + profile_html, 1)
            new_content = content_inside.replace(original_div, new_div)
            return header_start + new_content + '</div>'
        else:
            # If no action button div, just append it
            return header_start + content_inside + '<div style="display:flex; align-items:center; gap:16px;">' + profile_html + '</div></div>'

    new_content = re.sub(r'(<div class=\"(?:top-header|page-header)[^\"]*\".*?>)(.*?)\n\s*</div>\s*(?=<!--|\s*<div class=\"stat-grid|\s*<div class=\"two-col|\s*<div class=\"settings-grid|\s*<div class=\"search-filter)', replace_header, content, flags=re.DOTALL)
    
    # Inject JS at the end
    if 'dynamic-username-display' not in new_content:
        # If regex failed, let's do a simpler approach
        # Just prepend it inside .main-content
        new_content = re.sub(r'(<main class=\"main-content\">|<div class=\"main-content\">)', r'\1\n<div style="display:flex; justify-content:flex-end; padding: 10px 20px;">' + profile_html + '</div>', content)

    if 'stackly_username' not in new_content:
        new_content = new_content.replace('</body>', js_snippet + '\n</body>')

    if content != new_content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file}")
