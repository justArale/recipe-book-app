# recipe-book-app

Create a Home Page in your React app that has the following features:

Done:

- Render your JSON data as a list.
- Conditionally render content in the list items. Here is how you can do it:
  Include a condition to conditionally render content on each item in the list. For example, if your list items have a property isCompleted, show :heavy_check_mark: if it is true and :x: if it is false.
  If objects in your JSON dataset don’t contain any boolean property, make a conditional check that results in true or false. For example, you can check if a value is greater or less than a specified number.
  - Include a delete button on each list item that allows the user to delete the item from the list.
  - Make the list a separate component by extracting the code for better code organization (for example, <List />).
  - Make the list item a separate component and use the new component to render the list items (for example, <ListItem /> or <ItemCard />).
