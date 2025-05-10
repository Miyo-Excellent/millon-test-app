/**
 * Cryptocurrency.ts
 *
 * A model class representing a cryptocurrency.
 * This class follows OOP principles with proper encapsulation and validation.
 */

export class Cryptocurrency {
  private _id: string;
  private _symbol: string;
  private _name: string;
  private _rank: number;
  private _priceUsd: number;
  private _percentChange1h: number;
  private _percentChange24h: number;
  private _percentChange7d: number;
  private _marketCapUsd: number;
  private _volume24: number;
  private _circulatingSupply: number;
  private _totalSupply: number;
  private _maxSupply: number;

  /**
   * Constructor for the Cryptocurrency class
   * @param data The data to initialize the cryptocurrency with
   */
  constructor(data: {
    id: string;
    symbol: string;
    name: string;
    rank: number;
    priceUsd: number;
    percentChange1h: number;
    percentChange24h: number;
    percentChange7d: number;
    marketCapUsd: number;
    volume24: number;
    circulatingSupply: number;
    totalSupply: number;
    maxSupply: number;
  }) {
    this._id = data.id;
    this._symbol = data.symbol;
    this._name = data.name;
    this._rank = data.rank;
    this._priceUsd = data.priceUsd;
    this._percentChange1h = data.percentChange1h;
    this._percentChange24h = data.percentChange24h;
    this._percentChange7d = data.percentChange7d;
    this._marketCapUsd = data.marketCapUsd;
    this._volume24 = data.volume24;
    this._circulatingSupply = data.circulatingSupply;
    this._totalSupply = data.totalSupply;
    this._maxSupply = data.maxSupply;
  }

  /**
   * Static factory method to create a Cryptocurrency from API data
   * @param apiData The data from the API
   * @returns A new Cryptocurrency instance
   */
  static fromApiData(apiData: any): Cryptocurrency {
    return new Cryptocurrency({
      id: apiData.id,
      symbol: apiData.symbol,
      name: apiData.name,
      rank: parseInt(apiData.rank),
      priceUsd: parseFloat(apiData.price_usd),
      percentChange1h: parseFloat(apiData.percent_change_1h),
      percentChange24h: parseFloat(apiData.percent_change_24h),
      percentChange7d: parseFloat(apiData.percent_change_7d),
      marketCapUsd: parseFloat(apiData.market_cap_usd),
      volume24: parseFloat(apiData.volume24),
      circulatingSupply: parseFloat(apiData.csupply),
      totalSupply: parseFloat(apiData.tsupply),
      maxSupply: parseFloat(apiData.msupply),
    });
  }

  /**
   * Convert the Cryptocurrency to a plain object for Redux
   * @returns A plain object representation of the cryptocurrency
   */
  toPlainObject(): {
    id: string;
    symbol: string;
    name: string;
    rank: number;
    priceUsd: number;
    percentChange1h: number;
    percentChange24h: number;
    percentChange7d: number;
    marketCapUsd: number;
    volume24: number;
    circulatingSupply: number;
    totalSupply: number;
    maxSupply: number;
  } {
    return {
      id: this._id,
      symbol: this._symbol,
      name: this._name,
      rank: this._rank,
      priceUsd: this._priceUsd,
      percentChange1h: this._percentChange1h,
      percentChange24h: this._percentChange24h,
      percentChange7d: this._percentChange7d,
      marketCapUsd: this._marketCapUsd,
      volume24: this._volume24,
      circulatingSupply: this._circulatingSupply,
      totalSupply: this._totalSupply,
      maxSupply: this._maxSupply,
    };
  }

  // Getters
  get id(): string {
    return this._id;
  }

  get symbol(): string {
    return this._symbol;
  }

  get name(): string {
    return this._name;
  }

  get rank(): number {
    return this._rank;
  }

  get priceUsd(): number {
    return this._priceUsd;
  }

  get percentChange1h(): number {
    return this._percentChange1h;
  }

  get percentChange24h(): number {
    return this._percentChange24h;
  }

  get percentChange7d(): number {
    return this._percentChange7d;
  }

  get marketCapUsd(): number {
    return this._marketCapUsd;
  }

  get volume24(): number {
    return this._volume24;
  }

  get circulatingSupply(): number {
    return this._circulatingSupply;
  }

  get totalSupply(): number {
    return this._totalSupply;
  }

  get maxSupply(): number {
    return this._maxSupply;
  }

  // Methods
  /**
   * Calculate the fully diluted market cap
   * @returns The fully diluted market cap, or null if max supply is not available
   */
  calculateFullyDilutedMarketCap(): number | null {
    if (!this._maxSupply) return null;
    return this._priceUsd * this._maxSupply;
  }

  /**
   * Calculate the percentage of circulating supply
   * @returns The percentage of circulating supply, or null if max supply is not available
   */
  calculateCirculatingSupplyPercentage(): number | null {
    if (!this._maxSupply) return null;
    return (this._circulatingSupply / this._maxSupply) * 100;
  }

  /**
   * Calculate the price change amount for a given percentage change
   * @param percentChange The percentage change
   * @returns The price change amount
   */
  calculatePriceChange(percentChange: number): number {
    return (this._priceUsd * percentChange) / (100 + percentChange);
  }

  /**
   * Calculate the previous price based on a percentage change
   * @param percentChange The percentage change
   * @returns The previous price
   */
  calculatePreviousPrice(percentChange: number): number {
    return this._priceUsd - this.calculatePriceChange(percentChange);
  }
}
