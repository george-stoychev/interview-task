export default function Header() {
  function generateRandomLetter() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    return alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return (
    <header className="container">
      <h3>Hello user!</h3>
      <img
        style={{ width: "40px" }}
        src={`https://avatars.dicebear.com/api/male/${generateRandomLetter()}.svg`}
        alt="Avatar"
      />
    </header>
  );
}
