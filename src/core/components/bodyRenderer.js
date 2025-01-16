

// Imports
import { createBaseElement } from "../../utils/htmlUtils.js";


export class BodyRenderer {
  constructor(tableInstance, options = {}) {
    this.tableInstance = tableInstance;
    this.options = options;
  }

  createRow(data) {
    const row = createBaseElement(
      {
        tag: "tr",
        attributes: {
          class: "table-row",
        },
      }
    );
    // Add first cell
    row.appendChild(this.createFirstCell());
    // Add row cells
    data.forEach((cellData) => {
      row.appendChild(this.createCell(cellData));
    });

    return row;
  }

  createFirstCell() {
    const firstCell = createBaseElement(
      {
        tag: "td",
        attributes: {
          class: "table-cell",
        },
        children: [
          createBaseElement(
            {
              tag: "input",
              attributes: {
                type: "checkbox",
                class: "table-checkbox",
              },
            }
          )
        ]
      }
    );

    return firstCell;
  }

  createCell(data) {
    const cell = createBaseElement(
      {
        tag: "td",
        attributes: {
          class: "table-cell",
        },
      }
    );

    // Add cell content
    cell.textContent = data;

    return cell;
  }
}