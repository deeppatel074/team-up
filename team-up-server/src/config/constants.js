const STATUS = {
  user: {
    ACTIVE: 1,
    INACTIVE: 2,
  },
  task: {
    COMPLETED: 1,
    INCOMPLETE: 2,
  },
};

const defaultConfig = {
  status: STATUS,
};

export default {
  ...defaultConfig,
};
