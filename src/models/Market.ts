/**
 * Market.ts
 *
 * A model class representing a cryptocurrency market.
 * This class follows OOP principles with proper encapsulation and validation.
 */

export class Market {
  private _name: string;
  private _base: string;
  private _quote: string;
  private _price: number;
  private _priceUsd: number;
  private _volume: number;
  private _volumeUsd: number;
  private _time: number;

  /**
   * Constructor for the Market class
   * @param data The data to initialize the market with
   */
  constructor(data: {
    name: string;
    base: string;
    quote: string;
    price: number;
    priceUsd: number;
    volume: number;
    volumeUsd: number;
    time: number;
  }) {
    this._name = data.name;
    this._base = data.base;
    this._quote = data.quote;
    this._price = data.price;
    this._priceUsd = data.priceUsd;
    this._volume = data.volume;
    this._volumeUsd = data.volumeUsd;
    this._time = data.time;
  }

  /**
   * Static factory method to create a Market from API data
   * @param apiData The data from the API
   * @returns A new Market instance
   */
  static fromApiData(apiData: any): Market {
    return new Market({
      name: apiData.name,
      base: apiData.base,
      quote: apiData.quote,
      price: parseFloat(apiData.price),
      priceUsd: parseFloat(apiData.price_usd),
      volume: parseFloat(apiData.volume),
      volumeUsd: parseFloat(apiData.volume_usd),
      time: parseInt(apiData.time),
    });
  }

  /**
   * Convert the Market to a plain object for Redux
   * @returns A plain object representation of the market
   */
  toPlainObject(): {
    name: string;
    base: string;
    quote: string;
    price: number;
    priceUsd: number;
    volume: number;
    volumeUsd: number;
    time: number;
  } {
    return {
      name: this._name,
      base: this._base,
      quote: this._quote,
      price: this._price,
      priceUsd: this._priceUsd,
      volume: this._volume,
      volumeUsd: this._volumeUsd,
      time: this._time,
    };
  }

  // Getters
  get name(): string {
    return this._name;
  }

  get base(): string {
    return this._base;
  }

  get quote(): string {
    return this._quote;
  }

  get price(): number {
    return this._price;
  }

  get priceUsd(): number {
    return this._priceUsd;
  }

  get volume(): number {
    return this._volume;
  }

  get volumeUsd(): number {
    return this._volumeUsd;
  }

  get time(): number {
    return this._time;
  }

  // Methods
  /**
   * Calculate the price difference from USD
   * @returns The percentage difference between the market price and the USD price
   */
  calculatePriceDifferenceFromUsd(): number {
    if (!this._priceUsd) return 0;
    return ((this._price - this._priceUsd) / this._priceUsd) * 100;
  }

  /**
   * Get the formatted date of the market data
   * @returns A formatted date string
   */
  getFormattedDate(): string {
    return new Date(this._time * 1000).toLocaleString();
  }

  /**
   * Calculate the market share of the total volume
   * @param totalVolume The total volume across all markets
   * @returns The percentage of the total volume that this market represents
   */
  calculateMarketShare(totalVolume: number): number {
    if (!totalVolume) return 0;
    return (this._volumeUsd / totalVolume) * 100;
  }
}
