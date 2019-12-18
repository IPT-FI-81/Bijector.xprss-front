// import {Workflow} from "../models";

// import {MOCK_SERVICES} from "./service";

let MOCK_WORKFLOWS = [
// export let MOCK_WORKFLOWS: Workflow[] = [
  {
    Id: "1",
    Name: "Bj1",
    nodes: [
      {
        Id: "1",
        action: {
          Name: "Send msg",
          service: {
            Id: "1",
            Name: "NotTg"
          },
          arguments: [
            ["who", "Dana Skully"],
            ["what", "Hi there!"]
          ]
        }
      },
      {
        Id: "2",
        action: {
          Name: "Send msg",
          service: {
            Id: "1",
            Name: "NotTg"
          },
          arguments: [
            ["who", "Fox Mulder"],
            ["what", "The truth is out there!"]
          ]
        }
      }
    ],
    last_executed: "3/4/2014 mIdnight",
    IconId: "1",
    State: 0,
  },
  {
    Id: "2",
    Name: "Bj2",
    nodes: [
      {
        Id: "3",
        action: {
          Name: "Send msg",
          service: {
            Id: "1",
            Name: "NotTg"
          },
          arguments: [
            ["who", "Dana Skully"],
            ["what", "Hi there!"]
          ]
        }
      },
      {
        Id: "4",
        action: {
          Name: "Send msg",
          service: {
            Id: "1",
            Name: "NotTg"
          },
          arguments: [
            ["who", "Fox Mulder"],
            ["what", "The truth is out there!"]
          ]
        }
      }
    ],
    last_executed: "3/4/2020 afternoon",
    IconId: "2",
    State: 1,
  },
  {
    Id: "3",
    Name: "Long Name Workflow 3",
    nodes: [],
    IconId: "3",
    State: 2,
  },
  {
    Id: "4",
    Name: "Bj4",
    nodes: [],
    // IconId: "4", - No icon
    State: 3,
  },
];

module.exports = MOCK_WORKFLOWS;