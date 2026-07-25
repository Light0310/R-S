const str = "check out our guide on [What is a Box TV? How Modern Smart TV Boxes Are Revolutionizing Entertainment](/blog/what-is-a-box-tv-guide). By upgrading";
const regex = /\[([^\]]*how modern smart TV boxes are revolutionizing entertainment[^\]]*)\]\([^)]+\)/gi;
console.log(str.replace(regex, '$1'));
