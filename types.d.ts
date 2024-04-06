/* eslint-disable no-unused-vars */
export {}

declare global {
  interface Window {
    Solar: {
      fromDate: (date: Date) => ({
        getXingZuo: () => string
      })
    };
    Lunar: {
      fromDate: (date: Date) => ({
        getDayYi: () => string[],
        getDayJi: () => string[]
      })
    };
  }
}

declare module 'lunar-javascript' {
  export interface Lunar {
    fromDate: (date: Date) => ({
      getDayYi: () => string[];
      getDayJi: () => string[];
    })
  }

  export interface Solar {
    fromDate: (date: Date) => ({
      getXingZuo: () => string;
    })
  }
}