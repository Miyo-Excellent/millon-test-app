/**
 * StorageService.ts
 *
 * A service for local data persistence using AsyncStorage.
 * This service provides methods for storing, retrieving, and removing data from local storage.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Keys used for storing data in AsyncStorage
 */
export enum StorageKeys {
  CRYPTOCURRENCIES = "crypto_tracker_cryptocurrencies",
  GLOBAL_DATA = "crypto_tracker_global_data",
  MARKETS = "crypto_tracker_markets",
  SETTINGS = "crypto_tracker_settings",
  LAST_UPDATED = "crypto_tracker_last_updated",
  THEME_PREFERENCES = "crypto_tracker_theme_preferences",
}

/**
 * Service for handling local data persistence
 */
export class StorageService {
  /**
   * Store data in AsyncStorage
   * @param key The key to store the data under
   * @param value The data to store
   */
  static async storeData(key: string, value: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error("Error storing data:", error);
      throw error;
    }
  }

  /**
   * Retrieve data from AsyncStorage
   * @param key The key to retrieve data for
   * @returns The retrieved data, or null if not found
   */
  static async getData<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error("Error retrieving data:", error);
      throw error;
    }
  }

  /**
   * Remove data from AsyncStorage
   * @param key The key to remove data for
   */
  static async removeData(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing data:", error);
      throw error;
    }
  }

  /**
   * Clear all data from AsyncStorage
   */
  static async clearAll(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Error clearing data:", error);
      throw error;
    }
  }

  /**
   * Store the last updated timestamp for a specific data type
   * @param dataType The type of data being updated
   */
  static async storeLastUpdated(dataType: string): Promise<void> {
    try {
      const lastUpdated = {
        timestamp: Date.now(),
        dataType,
      };
      await this.storeData(
        `${StorageKeys.LAST_UPDATED}_${dataType}`,
        lastUpdated,
      );
    } catch (error) {
      console.error("Error storing last updated timestamp:", error);
      throw error;
    }
  }

  /**
   * Get the last updated timestamp for a specific data type
   * @param dataType The type of data to check
   * @returns The timestamp when the data was last updated, or null if not found
   */
  static async getLastUpdated(dataType: string): Promise<number | null> {
    try {
      const lastUpdated = await this.getData<{
        timestamp: number;
        dataType: string;
      }>(`${StorageKeys.LAST_UPDATED}_${dataType}`);
      return lastUpdated ? lastUpdated.timestamp : null;
    } catch (error) {
      console.error("Error getting last updated timestamp:", error);
      throw error;
    }
  }

  /**
   * Check if data needs to be refreshed based on a maximum age
   * @param dataType The type of data to check
   * @param maxAgeMs The maximum age of the data in milliseconds
   * @returns True if the data needs to be refreshed, false otherwise
   */
  static async needsRefresh(
    dataType: string,
    maxAgeMs: number,
  ): Promise<boolean> {
    const lastUpdated = await this.getLastUpdated(dataType);
    if (!lastUpdated) return true;

    const now = Date.now();
    return now - lastUpdated > maxAgeMs;
  }
}
