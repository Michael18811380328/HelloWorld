## 对于移动端按钮的回调函数的分析

思路一：使用享元模式优化多重的IF循环

这样需要引入新的变量

实际的代码如下

~~~jsx
showActionSheet = () => {
    const { t, column } = this.props;
    const columnType = column.type;
    const font = 'dtable-font dtable-icon-';
    const isNameColumn = column.key === '0000';
    // this is auxiliary buttons array
    let buttons = [{
      dom : <div className="my-am-action"><i className={`${font}rename`}></i>{t('Rename_Column')}</div>,
      value: 'rename_column',
    }];
  	// In different situations, push special object(contain dom and value) into buttonArray
    if (!isNameColumn) {
      buttons.push({
        dom: <div className="my-am-action"><i className={`${font}hide`}></i>{t('Hide_Column')}</div>,
        value: 'hide_column',
      });
    }
    switch(columnType) {
      case CellType.SINGLE_SELECT:
        buttons.push({
          dom: <div className="my-am-action"><i className={`${font}single-election`}></i>{t('Edit_Single_Select')}</div>,
          value: 'edit_single_select',
        });
        break;
      case CellType.MULTIPLE_SELECT:
        buttons.push({
          dom: <div className="my-am-action"><i className={`${font}multiple-selection`}></i>{t('Edit_Multiple_Select')}</div>,
          value: 'edit_multiple_select',
        });
        break;
      case CellType.NUMBER:
        buttons.push({
          dom: <div className="my-am-action"><i className={`${font}set-up`}></i>{t('Format_Settings')}</div>,
          value: 'number_format_settings',
        });
        break;
      case CellType.DATE:
        buttons.push({
          dom: <div className="my-am-action"><i className={`${font}set-up`}></i>{t('Format_Settings')}</div>,
          value: 'date_format_settings',
        });
        break;
      case CellType.FORMULA: 
        buttons.push({
          dom: <div className="my-am-action"><i className={`${font}formula`}></i>{t('Edit_Formula')}</div>,
          value: 'edit_formule',
        });
        break;
    }
    buttons.push({
      dom: <div className="my-am-action"><i className={`${font}modify-column-type`}></i>{t('Customize_column_type')}</div>,
      value: 'customize_column_type',
    });
    if (!isNameColumn) {
      buttons.push({
        dom: <div className="my-am-action"><i className={`${font}delete`}></i>{t('Delete_Column')}</div>,
        value: 'delete_column',
      });
    }
  	// This is real buttons array (ActionSheet use it)
    let optionButtons = [];
    for (let i = 0; i < buttons.length; i++) {
      optionButtons.push(buttons[i].dom);
    }
    ActionSheet.showActionSheetWithOptions({ options: optionButtons, maskClosable: true }, (buttonIndex) => {
      this.setState({ isMenuShow: false });
      const value = optionButtons[buttonIndex];
      this.onActionSheetClick(value);
    });
  }

  onActionSheetClick = (value) => {
    switch(value) {
      case 'rename_column':
        this.onRenameToggle();
        break;
      case 'hide_column':
        this.onHideColumn();
        break;
      case 'edit_single_select':
        this.toggleTheadSelectOptionDialog();
        break;
      case 'edit_multiple_select':
        this.toggleTheadSelectOptionDialog();
        break;
      case 'number_format_settings':
        this.toggleFormatView();
        this.setState({ columnFormat: NUMBER_FORMATS });
        break;
      case 'date_format_settings':
        this.toggleFormatView();
        this.setState({ columnFormat: DATE_FORMATS });
        break;
      case 'edit_formule':
        this.toggleEditFormulaDialog();
        break;
      case 'customize_column_type':
        this.toggleEditColumnDialog();
        break;
      case 'delete_column':
        this.onDeleteColumn();
        break;
    }
  }
~~~

思路二：直接对每一个数组的DOM元素，监听onClick事件

这样的缺点是，每一个都需要设置回调函数

~~~jsx
if (sortColumnOptions.includes(columnType)) {
      buttons.push(
        <div className="my-am-action" onClick={(e) => this.modifySort(SORT_TYPE.UP, e)}><i className={`${font}ascending-order`}></i>{t('Sort_Ascending')}</div>,
        <div className="my-am-action" onClick={(e) => this.modifySort(SORT_TYPE.DOWN, e)}><i className={`${font}descending-order`}></i>{t('Sort_Descending')}</div>
      );
    }
~~~

