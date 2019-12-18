// import {Workflow} from "../models";

// import {MOCK_SERVICES} from "./service";

let MOCK_WORKFLOWS = [
// export let MOCK_WORKFLOWS: Workflow[] = [
  {
    id: "1",
    title: "Bj1",
    nodes: [
      {
        id: "1",
        action: {
          title: "Send msg",
          service: {
            id: "1",
            title: "NotTg"
          },
          arguments: [
            ["who", "Dana Skully"],
            ["what", "Hi there!"]
          ]
        }
      },
      {
        id: "2",
        action: {
          title: "Send msg",
          service: {
            id: "1",
            title: "NotTg"
          },
          arguments: [
            ["who", "Fox Mulder"],
            ["what", "The truth is out there!"]
          ]
        }
      }
    ],
    last_executed: "3/4/2014 midnight",
    icon_id: "1",
    status: "on",
  },
  {
    id: "2",
    title: "Bj2",
    nodes: [
      {
        id: "3",
        action: {
          title: "Send msg",
          service: {
            id: "1",
            title: "NotTg"
          },
          arguments: [
            ["who", "Dana Skully"],
            ["what", "Hi there!"]
          ]
        }
      },
      {
        id: "4",
        action: {
          title: "Send msg",
          service: {
            id: "1",
            title: "NotTg"
          },
          arguments: [
            ["who", "Fox Mulder"],
            ["what", "The truth is out there!"]
          ]
        }
      }
    ],
    last_executed: "3/4/2020 afternoon",
    icon_id: "2",
    status: "off",
  },
  {
    id: "3",
    title: "Long Name Workflow 3",
    nodes: [],
    icon_id: "3",
    status: "err",
  },
  {
    id: "4",
    title: "Bj4",
    nodes: [],
    // icon_id: "4", - No icon
    status: "notif",
  },
];

module.exports = MOCK_WORKFLOWS;