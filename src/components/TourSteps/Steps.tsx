const homePageSteps = [
  {
    target: "#tour-typography",
    content:
      "Welcome to the search page! This is where you'll begin your tour.",
  },
  {
    target: "#outlined-basic",
    content:
      "Enter user handles here. You can insert either one or multiple user handles.",
  },
  {
    target: "#tour-add-user-handle-input",
    content: "Click this button to add the user handles that you've inserted.",
  },
  {
    target: "#outlined-textarea",
    content:
      "Enter a description for the search here. Describe what you're looking for in the users.",
  },
  {
    target: "#tour-count-input",
    content:
      "Choose the number of users to search for. Specify how many similar users you want to find.",
  },
  {
    target: "#tour-depth-input",
    content:
      "Enter the depth for searching the user. A higher depth will yield better results but will take longer to find users.",
  },
  {
    target: "#tour-search-button",
    content:
      "Click this button to start the search. Initiate the process to find users with similar interests.",
  },
  {
    target: "#tour-users-list",
    content:
      "Here you will see the list of users matching your search. View the results of your search here.",
  },
  {
    target: "#profilePageButton",
    content:
      "Click here to view your profile page and configure it as you would like.",
  },
];

const profilePageSteps = [
  {
    target: "#tour-typography",
    content:
      "Welcome to the Profile page! In this tour, I will show you the things you need to know.",
  },
  {
    target: "#personalInfo",
    content: "Here you can see or edit your display name and also your email",
  },
  {
    target: "#apiKeyInfo",
    content: "In here you can insert Your Twitter API key that is going to be used for the search.",
  },
];

const historyPageSteps = [
  {
    target: "#tour-typography",
    content:
      "Welcome to the HIstory page! In this tour, I will show you the things you need to know.",
  },
  {
    target: "#historyResult",
    content: "Here you will find all the users that appeared catagorized by the prompt you inserted.",
  },
  {
    target: "#loadMoreButton",
    content: "Click here to load more users that appeared because of the prompt.",
  },
];

export { homePageSteps, profilePageSteps, historyPageSteps };
