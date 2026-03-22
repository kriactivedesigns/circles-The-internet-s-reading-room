# circles - The internet's reading room
circles replaces algorithmic outrage with deep content consumption (Reading Room / Feed Orbit) and serendipitous, organic human connection. The platform uses an ambient collision engine that converts passive readers into active conversation participants through a sequence of explicitly consented, transient states.


🛠 Windows Development Setup (Path Length Fix)
To avoid the Windows 260-character path limit and CMake/Ninja compilation errors (especially when using react-native-reanimated), we use an NTFS Directory Junction. This allows the build tools to see a short, clean path without physically moving your project or using unstable virtual drives (subst).

1. Prerequisites
OS: Windows 10/11

Permissions: Administrator access is required to create the Junction.

Original Project Path: D:\CausalSyntax\circles - The internet's reading room\projects\frontend-mobile (Example)

2. Create the Short-Path Junction
Open Command Prompt (CMD) as Administrator and run the following command:

DOS
:: Create the virtual directory link
mklink /J "D:\virtual\circles" "YOUR_ORIGINAL_LONG_PATH_HERE"
Note: Replace YOUR_ORIGINAL_LONG_PATH_HERE with the actual path to your frontend-mobile folder. Keep the quotes!

3. Open the Project in VS Code
CRITICAL: To ensure the build tools and IntelliSense work correctly, you must open the "Virtual" path in VS Code, not the original long path.

Open Folder: D:\virtual\circles