# Butcher

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

Chopping up zone files since 2023.

    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⢀⣀⣤⣤⠄⢀⣤⠀⣾⣿⣿⣿⠀⣀⠀⢠⣤⣤⣀⡀⠀⠀⠀⠀⠀
    ⠀⠀⠀⢀⣶⣿⣿⣿⠃⣰⣿⣿⣄⠙⠿⠿⠋⣠⣿⣷⡄⠹⣿⣿⣿⣶⡀⠀⠀⠀
    ⠀⠀⣰⣿⣿⣿⣿⠇⢰⣿⣿⣿⣿⣷⣶⣶⣾⣿⣿⣿⣿⡀⢹⣿⣿⣿⣿⣄⠀⠀
    ⠀⢸⣿⣿⡿⠋⠀⠀⣿⡏⠀⠙⠻⣿⣿⣿⣿⠟⠁⠀⣿⣧⠀⠀⠙⢿⣿⣿⡆⠀
    ⠀⣿⣿⡿⠀⠀⠀⢰⣿⣿⣤⣤⣴⣿⣿⣿⣿⣦⣤⣴⣿⣿⠀⠀⠀⠈⣿⣿⡇⠀
    ⠀⢹⣿⣇⠀⠀⠀⢸⣿⣿⣿⣿⣷⡙⠻⠟⢩⣿⣿⣿⣿⣿⠀⠀⠀⠀⣼⣿⡇⠀
    ⠀⠈⠻⣿⣆⠀⠀⠈⠉⠉⠉⣿⣿⣷⡀⢠⣿⣿⡏⠉⠉⠉⠀⠀⠀⣰⣿⠟⠀⠀
    ⠀⠀⠀⠈⠉⠓⠂⠀⠀⠀⠀⣿⣿⣿⣷⣿⣿⣿⡇⠀⠀⠀⠀⠐⠛⠉⠁⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⢿⡟⠈⣿⡿⠈⢿⡇⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⡆⠘⢀⡆⠸⠃⣠⠈⠃⢸⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⡇⠀⣾⣷⠀⢀⣿⣧⠀⣼⣿⣷⡄⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠸⣿⣿⣿⠇⠸⣿⣿⠀⠸⣿⣿⠆⢻⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠈⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀

# Usage

### IMPORTANT
    npm install
### IMPORTANT

    npm start --help
    # Or
    node Butcher.js --help
    # Or
    node Butcher.js getZones --token dnsimple_a_XXX
    # Or
    node Butcher.js createZone --token dnsimple_a_XXX -id ## [then chase the arguments to create a zone record]
