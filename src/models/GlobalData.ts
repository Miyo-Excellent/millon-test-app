/**
 * GlobalData.ts
 *
 * A model class representing global cryptocurrency market data.
 * This class follows OOP principles with proper encapsulation and validation.
 */

export class GlobalData {
  private _coinsCount: number;
  private _activeMarkets: number;
  private _totalMarketCap: number;
  private _totalVolume: number;
  private _btcDominance: string;
  private _ethDominance: string;
  private _marketCapChange: string;
  private _volumeChange: string;
  private _avgChangePercent: string;
  private _volumeAth: number;
  private _marketCapAth: number;

  /**
   * Constructor for the GlobalData class
   * @param data The data to initialize the global data with
   */
  constructor(data: {
    coinsCount: number;
    activeMarkets: number;
    totalMarketCap: number;
    totalVolume: number;
    btcDominance: string;
    ethDominance: string;
    marketCapChange: string;
    volumeChange: string;
    avgChangePercent: string;
    volumeAth: number;
    marketCapAth: number;
  }) {
    this._coinsCount = data.coinsCount;
    this._activeMarkets = data.activeMarkets;
    this._totalMarketCap = data.totalMarketCap;
    this._totalVolume = data.totalVolume;
    this._btcDominance = data.btcDominance;
    this._ethDominance = data.ethDominance;
    this._marketCapChange = data.marketCapChange;
    this._volumeChange = data.volumeChange;
    this._avgChangePercent = data.avgChangePercent;
    this._volumeAth = data.volumeAth;
    this._marketCapAth = data.marketCapAth;
  }

  /**
   * Static factory method to create a GlobalData from API data
   * @param apiData The data from the API
   * @returns A new GlobalData instance
   */
  static fromApiData(apiData: any): GlobalData {
    return new GlobalData({
      coinsCount: apiData.coins_count,
      activeMarkets: apiData.active_markets,
      totalMarketCap: apiData.total_mcap,
      totalVolume: apiData.total_volume,
      btcDominance: apiData.btc_d,
      ethDominance: apiData.eth_d,
      marketCapChange: apiData.mcap_change,
      volumeChange: apiData.volume_change,
      avgChangePercent: apiData.avg_change_percent,
      volumeAth: apiData.volume_ath,
      marketCapAth: apiData.mcap_ath,
    });
  }

  /**
   * Convert the GlobalData to a plain object for Redux
   * @returns A plain object representation of the global data
   */
  toPlainObject(): {
    coinsCount: number;
    activeMarkets: number;
    totalMarketCap: number;
    totalVolume: number;
    btcDominance: string;
    ethDominance: string;
    marketCapChange: string;
    volumeChange: string;
    avgChangePercent: string;
    volumeAth: number;
    marketCapAth: number;
  } {
    return {
      coinsCount: this._coinsCount,
      activeMarkets: this._activeMarkets,
      totalMarketCap: this._totalMarketCap,
      totalVolume: this._totalVolume,
      btcDominance: this._btcDominance,
      ethDominance: this._ethDominance,
      marketCapChange: this._marketCapChange,
      volumeChange: this._volumeChange,
      avgChangePercent: this._avgChangePercent,
      volumeAth: this._volumeAth,
      marketCapAth: this._marketCapAth,
    };
  }

  // Getters
  get coinsCount(): number {
    return this._coinsCount;
  }

  get activeMarkets(): number {
    return this._activeMarkets;
  }

  get totalMarketCap(): number {
    return this._totalMarketCap;
  }

  get totalVolume(): number {
    return this._totalVolume;
  }

  get btcDominance(): string {
    return this._btcDominance;
  }

  get ethDominance(): string {
    return this._ethDominance;
  }

  get marketCapChange(): string {
    return this._marketCapChange;
  }

  get volumeChange(): string {
    return this._volumeChange;
  }

  get avgChangePercent(): string {
    return this._avgChangePercent;
  }

  get volumeAth(): number {
    return this._volumeAth;
  }

  get marketCapAth(): number {
    return this._marketCapAth;
  }

  // Methods
  /**
   * Calculate the percentage of the total market cap that is at its all-time high
   * @returns The percentage of the total market cap that is at its all-time high
   */
  calculateMarketCapAthPercentage(): number {
    if (!this._marketCapAth) return 0;
    return (this._totalMarketCap / this._marketCapAth) * 100;
  }

  /**
   * Calculate the percentage of the total volume that is at its all-time high
   * @returns The percentage of the total volume that is at its all-time high
   */
  calculateVolumeAthPercentage(): number {
    if (!this._volumeAth) return 0;
    return (this._totalVolume / this._volumeAth) * 100;
  }

  /**
   * Calculate the average market cap per coin
   * @returns The average market cap per coin
   */
  calculateAverageMarketCapPerCoin(): number {
    if (!this._coinsCount) return 0;
    return this._totalMarketCap / this._coinsCount;
  }

  /**
   * Calculate the average volume per market
   * @returns The average volume per market
   */
  calculateAverageVolumePerMarket(): number {
    if (!this._activeMarkets) return 0;
    return this._totalVolume / this._activeMarkets;
  }

  /**
   * Calculate the combined dominance of Bitcoin and Ethereum
   * @returns The combined dominance of Bitcoin and Ethereum
   */
  calculateBtcEthCombinedDominance(): number {
    return parseFloat(this._btcDominance) + parseFloat(this._ethDominance);
  }

  /**
   * Calculate the dominance of all other cryptocurrencies
   * @returns The dominance of all other cryptocurrencies
   */
  calculateOthersDominance(): number {
    return 100 - this.calculateBtcEthCombinedDominance();
  }
}
