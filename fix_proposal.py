with open('src/components/birthday/ProposalStage.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Keep lines 0-394 (indices 0-394) and lines 508+ (indices 508+)
new_lines = lines[:395] + lines[508:]

with open('src/components/birthday/ProposalStage.tsx', 'w', encoding='utf-8', newline='\r\n') as f:
    f.writelines(new_lines)

print("Fixed ProposalStage.tsx - removed duplicate celebration section")
