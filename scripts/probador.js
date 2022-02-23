function contePass(srt) {
  let regex = new RegExp(`^(?=.*d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$`);
  return regex.test(srt);
}
console.log(contePass("danieAsdl21"));
// console.log(contePass());
// console.log(contePass());