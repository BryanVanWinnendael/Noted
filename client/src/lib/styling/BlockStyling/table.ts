export const tableStyle = (
  backgroundColor: string,
  secondaryBackgroundolor: string,
  mutedTextColor: string,
  borderColor: string,
) => {
  return `
    .tc-wrap{
      width: 90% !important;
    }
    .tc-popover{
      background-color: ${secondaryBackgroundolor} !important;
      color: ${mutedTextColor} !important;
      border-color: ${borderColor} !important;
    }
    .tc-popover__item-icon{
      background-color: ${backgroundColor} !important;
    }
    .tc-cell--selected{
      background-color: ${backgroundColor} !important;
    }
    .tc-cell, .tc-row, .tc-table, .tc-add-column,.tc-row:after{
      border-color: ${borderColor} !important;
    }
    .tc-add-column, .tc-add-row{
      color: ${mutedTextColor} !important;
    }
    .tc-add-column:hover, .tc-add-row:hover, .tc-add-row:hover:before{
      background-color: ${secondaryBackgroundolor} !important;
    }
  `;
};
