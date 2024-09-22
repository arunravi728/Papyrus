---
title: Mac Terminal Upgrade
created: Saturday - 9th December, 2023
updated: Saturday - 9th December, 2023
consumed: 1
share: true
---

Self Link: [Mac Terminal Upgrade](Mac%20Terminal%20Upgrade.md)
Source: https://youtu.be/CF1tMjvHDRA?feature=shared
Source: https://youtu.be/27Fi2RcdBFQ?feature=shared

#### Step 1 - Install Homebrew

````bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
````

#### Step 2 - Add Homebrew to path

````shell
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/arun/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
````

#### Step 3 - Install OhMyZsh

````shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
````

#### Step 4 - Install PowerLevel10k

````shell
git clone https://github.com/romkatv/powerlevel10k.git $ZSH_CUSTOM/themes/powerlevel10k
````

Now open `~/.zshrc` and set the default ZSH theme - 

````
ZSH_THEME="powerlevel10k/powerlevel10k"
````

Now run the following command to apply changes to your terminal - 

````shell
source ~/.zshrc
````

Now you are free to configure PowerLevel10k. You can also run the following command to bring up the configuration - 

````shell
p10k configure
````

#### Install Zsh Plugins

1. zsh-autosuggestions

````shell
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
````

2. zsh-syntax-highlight

````shell
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
````

Now modify the plugins line in `~/.zshrc`.

````
plugins=(git zsh-autosuggestions zsh-syntax-highlighting web-search)
````

Now run the following command to apply changes to your terminal - 

````shell
source ~/.zshrc
````
