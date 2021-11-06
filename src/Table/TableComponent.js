/*
 * @Author: devfpy
 * @Date: 2021-11-06 16:43:52
 * @LastEditTime: 2021-11-06 20:51:15
 * @LastEditors: devfpy
 * @Description:
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'

const TableSelectionMode = {
  TableSelectionModeNone: 'none',
  TableSelectionModeSingle: 'radio',
  TableSelectionModeMultiple: 'checkbox'
}

class TableComponent extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    dataSource: PropTypes.array.isRequired,
    isZebra: PropTypes.bool,
    primaryKey: PropTypes.string.isRequired,
    isShowPagination: PropTypes.bool,
    isShowTotalRecord: PropTypes.bool, //是否显示总记录数
    selectedRowKeys: PropTypes.array,
    selectedRowData: PropTypes.array,
    tablePagesize: PropTypes.number,
    tableTotalRecord: PropTypes.number,
    children: PropTypes.any,
    tableSelectionMode: PropTypes.string,
    tableDefaultSelectRowKeys: PropTypes.array,
    tableOnChange: PropTypes.func,
    tableOnSelect: PropTypes.func,
    tableOnRowClick: PropTypes.func,
    getCellProps: PropTypes.func,
    paginationSize: PropTypes.string,
    paginationOnChange: PropTypes.func,
    paginationShape: PropTypes.string,
    paginationType: PropTypes.string,
    paginationShowQuickJumper: PropTypes.bool,
    cols: PropTypes.array,
    currentPage: PropTypes.number,
    rowProps: PropTypes.func,
    onSort: PropTypes.func,
    onFilter: PropTypes.func,
    handleOnSort: PropTypes.func,
    isShowSelectAll: PropTypes.bool,
    hasHeader: PropTypes.bool,
    hasBorder: PropTypes.bool,
    useVirtual: PropTypes.bool,
    scroll: PropTypes.scroll,
    maxBodyHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    getProps: PropTypes.func,
    onResizeChange: PropTypes.func
  }

  static defaultProps = {
    isShowPagination: true,
    isShowTotalRecord: false,
    paginationSize: 'default',
    paginationShape: 'normal',
    paginationType: 'normal',
    hasHeader: true,
    hasBorder: true,
    useVirtual: false,
    isZebra: true,
    scroll: null,
    paginationShowQuickJumper: false
  }

  constructor(props) {
    super(props)

    this.state = {
      selectedRowKeys: [],
      selectedRowData: [],
      currentPage: 1
    }

    this.tableRef = React.createRef()
  }

  /**
   * Table  onChange
   * @param {*} pagination
   * @param {*} filters
   * @param {*} sorter
   */
  handleTableOnChange = (pagination, filters, sorter) => {
    if (pagination) {
      let { current } = pagination
      let { currentPage } = this.state
      if (currentPage != current) {
        this.setState({
          currentPage: current
        })
        if (this.props.paginationOnChange) {
          this.props.paginationOnChange(current)
        }
      }
    }

    if (sorter) {
      let { field, order } = sorter
      // order [ascend:升序  descend:降序]
      let orderStr = order ? (order == 'ascend' ? 'asc' : 'desc') : ''
      this.props.onSort && this.props.onSort(field, orderStr)
    }
  }

  /**
   * Table RowOnChange
   * @param {*} selectedRowKeys
   * @param {*} selectedRows
   */
  tableRowSelectionOnChange = (selectedRowKeys, selectedRows) => {
    if (this.props.tableOnChange) {
      this.props.tableOnChange(selectedRowKeys, selectedRows)
    }
  }

  /**
   * Table Row手动选中或取消选中
   * @param {*} record
   * @param {*} selected
   * @param {*} selectedRows
   * @param {*} nativeEvent
   */
  tableRowSelectionOnSelect = (record, selected, selectedRows, nativeEvent) => {
    // console.log('............... table row 手动选中或取消选中')
  }

  paginationOnChange = (currentPage) => {
    this.setState({
      currentPage
    })
    if (this.props.paginationOnChange) {
      this.props.paginationOnChange(currentPage)
    }
  }

  render() {
    const pagination =
      this.props.isShowPagination == true
        ? {
            size: this.props.paginationSize,
            current: this.props.currentPage
              ? this.props.currentPage
              : this.state.currentPage,
            pageSize: this.props.tablePagesize,
            total: this.props.tableTotalRecord,
            showSizeChanger: false,
            showQuickJumper: this.props.paginationShowQuickJumper,
            showTotal:
              this.props.isShowTotalRecord == true
                ? (total) => `总记录数：${total}`
                : undefined
          }
        : false

    const rowSelection =
      this.props.tableSelectionMode == 'none'
        ? null
        : {
            type: this.props.tableSelectionMode,
            preserveSelectedRowKeys: true,
            selectedRowKeys: this.props.selectedRowKeys,
            onChange: this.tableRowSelectionOnChange
          }

    const tableOnRow = (record, index) => {
      return {
        onClick: (event) => {
          this.props.tableOnRowClick &&
            this.props.tableOnRowClick(index, record, event)
        }
        // onDoubleClick: (event) => {},
        // onContextMenu: (event) => {},
        // onMouseEnter: (event) => {},
        // onMouseLeave: (event) => {}
      }
    }

    const renderTitle = (colItem) => {
      let dom = <span>{colItem.title}</span>
      if (colItem.filter && colItem.filterType == 'input') {
        dom = (
          <Balloon
            autoFocus
            trigger={
              <div>
                {colItem.title}{' '}
                <Icon type='filter' size='xs' style={{ marginLeft: '8px' }} />
              </div>
            }
            closable={false}
            triggerType='click'
            style={{ border: '1px solid #70A1FF' }}
          >
            <Form>
              <Form.Item style={{ marginBottom: '10px' }}>
                <Input name={colItem.dataIndex} placeholder='请输入筛选内容' />
              </Form.Item>
              <Form.Item label='' style={{ marginBottom: '0' }}>
                <Form.Submit type='primary' onClick={this.handleInputFilter}>
                  确认
                </Form.Submit>{' '}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Form.Reset
                  onClick={() => this.handleInputFilterReset(colItem.dataIndex)}
                >
                  重置
                </Form.Reset>
              </Form.Item>
            </Form>
          </Balloon>
        )
      }
      return dom
    }
    return (
      <Table
        dataSource={this.props.dataSource}
        bordered={this.props.hasBorder ? this.props.hasBorder : false}
        loading={this.props.loading}
        rowKey={this.props.primaryKey}
        showHeader={this.props.hasHeader ? this.props.hasHeader : false}
        pagination={pagination}
        rowSelection={rowSelection}
        onChange={this.handleTableOnChange}
        onRow={tableOnRow}
        scroll={this.props.scroll}
      >
        {this.props.cols
          ? this.props.cols.map((col) => (
              <Table.Column
                title={renderTitle(col)}
                //   filters={col.filterData}
                //   filterMode={col.filterMode}
                dataIndex={col.dataIndex}
                key={col.dataIndex}
                render={col.cell}
                align={col.align}
                alignHeader={col.alignHeader}
                width={col.width}
                fixed={col.lock ? col.lock : false}
                sorter={col.sortable ? col.sortable : false}
                showSorterTooltip={false}
                resizable={col.resizable == true ? true : false}
              />
            ))
          : this.props.children}
      </Table>
    )
  }
}
export { TableSelectionMode, TableComponent }
