// Forbidden Oasis typography usage example
// Import once in your app entry or global stylesheet:
//
// import "./styles/fonts.css";
// import "./styles/forbidden-oasis-theme.css";

export function VaultHeading() {
  return (
    <section>
      <p className="fo-data-label">Your Personal Vault</p>

      <h1 className="fo-hero-title">
        Stake WATER
      </h1>

      <p className="fo-hero-subtitle">
        Earn WATER and BNB while your staking vault preserves your dividends.
      </p>

      <h2 className="fo-section-title">
        My Vault
      </h2>

      <div className="fo-balance">
        25,680.42 WATER
      </div>

      <div className="fo-metric">
        1,248.75 WATER
      </div>

      <button className="fo-button">
        <span className="fo-button-label">Claim WATER</span>
      </button>
    </section>
  );
}
