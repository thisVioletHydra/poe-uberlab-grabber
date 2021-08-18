type TPromise = (value?: {} | PromiseLike<{}>) => void;

interface INodeGlobal {
  nodeRepeat: (ms: number, callback: CallableFunction) => Promise<{}>;
  nodeTimeout: (ms: number) => Promise<{}>;
}

export const global: INodeGlobal = {
  nodeTimeout: ms => {
    return new Promise((resolve: TPromise) => {
      return setTimeout(resolve, ms);
    });
  },

  nodeRepeat: (ms, callback) => {
    return new Promise((resolve: TPromise) => {
      const interval = setInterval(callback, ms);
      global.nodeTimeout(ms).then(() => resolve(interval));
    });
  },
};
