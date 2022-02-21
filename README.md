# anchor-components-table-antd

> anchor components library table by antd [基于 Antd 的前端通用组件]

[![NPM](https://img.shields.io/npm/v/anchor-components-table-antd.svg)](https://www.npmjs.com/package/anchor-components-table-antd) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

1. Table组件与分页组件合并<br />
2. 建议使用cols属性指定列<br />

## Props of Component

### TableSelectionMode
> TableSelectionModeNone: 'none' 禁止选中<br />
> TableSelectionModeSingle: 'radio' 单选<br />
> TableSelectionModeMultiple: 'checkbox' 多选<br />

### TableComponent props
props | type | desc
---|---|---
loading | PropTypes.bool.isRequired | 加载中
dataSource | PropTypes.array.isRequired | 数据源
isZebra | PropTypes.bool | 是否显示斑马线
primaryKey | PropTypes.string.isRequired | 数据主键
isShowPagination | PropTypes.bool | 是否显示分页
isShowTotalRecord | PropTypes.bool | 是否显示总记录
selectedRowKeys | PropTypes.array | 选中行的keys
selectedRowData | PropTypes.array | 选中行的record data
tablePagesize | PropTypes.number | 每页记录总数
tableTotalRecord | PropTypes.number | 总记录数
children | PropTypes.any | 子组件【列】 建议使用cols传递列的配置信息
tableSelectionMode | PropTypes.string | 选中模式 禁止 单选 多选
tableDefaultSelectRowKeys | PropTypes.array | 默认选中的keys
tableOnChange | PropTypes.func | 选中changed
tableOnSelect | PropTypes.func | 选中changed
tableOnRowClick | PropTypes.func | 行点击
getCellProps | PropTypes.func | 
paginationSize | PropTypes.string | 分页器大小
paginationOnChange | PropTypes.func | 分页changed
paginationShape | PropTypes.string | 分页器形状
paginationType | PropTypes.string | 分页器类型
paginationShowQuickJumper | PropTypes.bool | 是否显示快捷跳转
cols | PropTypes.array | table列
currentPage | PropTypes.number | 当前页码
onSort | PropTypes.func | 点击排序
hasHeader | PropTypes.bool | 是否显示表头
hasBorder | PropTypes.bool | 是否显示表格线
useVirtual | PropTypes.bool | 使用虚拟滚动
scroll | PropTypes.object | 滚动范围，所列时可指定x横向滚动的值

### cols props
props | type | desc
---|---|---
title | string | 列title
dataIndex | string  | 数据key
key | string  | 列唯一标识
render | func | 列自定义render方法
align | string  | 列内容对齐方式
alignHeader | string | 列表头对齐方式
width | number | 列宽
lock | bool/string | 是否锁定
sorter | bool | 是否开启排序
textWrap | string | 内容换行方式word-break
ellipsis | bool | 超过宽度自动省略
showSorterTooltip  | string | 表头显示下一次排序的 tooltip
resizable | bool | 是否开启列宽调整



## Install

```bash
npm install --save anchor-components-table-antd
```

## Usage

```jsx
import React, { Component } from 'react'
import {
  TableSelectionMode,
  TableComponent
} from 'anchor-components-table-antd'

class Example extends Component {
  render() {
    return (
      <TableComponent
        loading={this.props.loading}
        dataSource={this.props.dataSource.data}
        primaryKey={'id'}
        isShowPagination={this.props.isShowPagination}
        currentPage={this.props.dataSource.currentPage}
        tableTotalRecord={this.props.dataSource.total}
        tablePagesize={this.props.tableTotalRecord}
        paginationOnChange={this.props.paginationOnChange}
        tableOnChange={(selectedRowKeys, selectedRows) => {
          this.props.handleTableOnChange &&
            this.props.handleTableOnChange(selectedRowKeys, selectedRows)
        }}
        tableSelectionMode={TableSelectionMode.TableSelectionModeNone}
        onSort={this.props.handleOnSort}
        selectedRowKeys={this.props.selDataIds}
        onResizeChange={this.handleTableOnResizeChange}
        scroll={{ x: 1200 }}
        tableOnRowClick={(index, record, e) => {
          this.props.tableRowOnClick &&
            this.props.tableRowOnClick(index, record)
        }}
        cols={this.props.cols}
      />
    )
  }
}
```

## License

MIT © [https://github.com/devfpy](https://github.com/https://github.com/devfpy)
