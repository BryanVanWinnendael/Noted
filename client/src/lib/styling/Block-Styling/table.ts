export const tableStyle = (
  background_color: string,
  secondary_background_color: string,
  muted_text_color: string,
  border_color: string,
) => {
  return `
    .tc-wrap{
      width: 90% !important;
    }
    .tc-popover{
      background-color: ${secondary_background_color} !important;
      color: ${muted_text_color} !important;
      border-color: ${border_color} !important;
    }
    .tc-popover__item-icon{
      background-color: ${background_color} !important;
    }
    .tc-cell--selected{
      background-color: ${background_color} !important;
    }
    .tc-cell, .tc-row, .tc-table, .tc-add-column,.tc-row:after{
      border-color: ${border_color} !important;
    }
    .tc-add-column, .tc-add-row{
      color: ${muted_text_color} !important;
    }
    .tc-add-column:hover, .tc-add-row:hover, .tc-add-row:hover:before{
      background-color: ${secondary_background_color} !important;
    }
  `;
};
