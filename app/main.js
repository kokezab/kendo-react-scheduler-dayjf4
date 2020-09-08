import React from 'react';
import ReactDOM from 'react-dom';
import '@progress/kendo-ui/';
import { Scheduler } from '@progress/kendo-scheduler-react-wrapper';



class SchedulerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.startTime = new Date("2013/6/13 07:00 AM")
    this.resources = [
      {
        field: "ownerId",
        title: "Owner",
        dataSource: [
          { text: "Alex", value: 1, color: "#f8a398" },
          { text: "Bob", value: 2, color: "#51a0ed" },
          { text: "Charlie", value: 3, color: "#56ca85" }
        ]
      }
    ]
    this.views = [
      "day",
      { type: "workWeek", selected: true },
      "week",
      "month",
      "agenda",
      { type: "timeline", eventHeight: 50 }
    ]
    this.views = [{ type: "workWeek", selected: true }]
    this.dataSource = new kendo.data.SchedulerDataSource({
      batch: true,
      transport: {
        read: {
          url: "https://demos.telerik.com/kendo-ui/service/tasks",
          dataType: "jsonp"
        },
        update: {
          url: "https://demos.telerik.com/kendo-ui/service/tasks/update",
          dataType: "jsonp"
        },
        create: {
          url: "https://demos.telerik.com/kendo-ui/service/tasks/create",
          dataType: "jsonp"
        },
        destroy: {
          url: "https://demos.telerik.com/kendo-ui/service/tasks/destroy",
          dataType: "jsonp"
        },
        parameterMap: function (options, operation) {
          if (operation !== "read" && options.models) {
            return { models: kendo.stringify(options.models) };
          }
        }
      },
      schema: {
        model: {
          id: "taskId",
          fields: {
            taskId: { from: "TaskID", type: "number" },
            title: { from: "Title", defaultValue: "No title", validation: { required: true } },
            start: { type: "date", from: "Start" },
            end: { type: "date", from: "End" },
            startTimezone: { from: "StartTimezone" },
            endTimezone: { from: "EndTimezone" },
            description: { from: "Description" },
            recurrenceId: { from: "RecurrenceID" },
            recurrenceRule: { from: "RecurrenceRule" },
            recurrenceException: { from: "RecurrenceException" },
            ownerId: { from: "OwnerID", defaultValue: 1 },
            isAllDay: { type: "boolean", from: "IsAllDay" }
          }
        }
      },
      filter: {
        logic: "or",
        filters: [
          { field: "ownerId", operator: "eq", value: 1 },
          { field: "ownerId", operator: "eq", value: 2 }
        ]
      }
    })
  }
  render() {
    return (
      <div>
        <Scheduler height={600}
          change={this.onChange}
          views={this.views}
          dataSource={this.dataSource}
          date={new Date("2013/6/13")}
          startTime={this.startTime}
          resources={this.resources} />
      </div>
    );
  }
}
ReactDOM.render(
  <SchedulerContainer />,
  document.querySelector('my-app')
);
