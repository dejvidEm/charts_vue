import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-4 text-center text-blue-600">
        Vitaj na stránke GraphApp
      </h1>
      <p className="text-lg font-light text-center mb-8 max-w-md">
        GraphApp je moderná webová aplikácia na jednoduché zobrazenie a analýzu
        grafov. Pomocou našej aplikácie môžeš rýchlo a jednoducho vizualizovať
        svoje dáta a získať z nich užitočné informácie.
      </p>

      {/* Sekcia Funkcií */}
      <div className="text-center mb-10 space-y-6 max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-700">
          Hlavné funkcie
        </h2>
        <ul className="list-none space-y-4 text-gray-600">
          <li>- Intuitívne ovládanie a čistý dizajn</li>
          <li>- Podpora rôznych typov grafov</li>
          <li>- Reaguje na tvoje potreby v reálnom čase</li>
          <li>- Optimalizované pre mobilné zariadenia</li>
        </ul>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <Link to="/stranka1" className="text-purple">Prehliadaj teraz</Link>
      </div>
    </div>
  );
};

export default LandingPage;