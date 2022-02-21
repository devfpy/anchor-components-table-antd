import React, { Component } from 'react'
import { Table } from 'antd'
// import {
//   TableSelectionMode,
//   TableComponent
// } from 'anchor-components-table-antd'
import { Resizable } from 'react-resizable'

const dataSource = [
  {
    id: '1',
    title: '我是标题',
    desc: '我的内容很长我的内容很长我的内容很长我的内容很长我的内容很长我的内容很长我的内容很长我的内容很长我的内容很长',
    time: '2022-01-01 00:00:00'
  },
  {
    id: '2',
    title: '我是标题',
    desc: '我的内容很长我的内容很长我的内容很长我的内容很长我的内容很长我的内容很长我的内容很长我的内容很长我的内容很长',
    time: '2022-01-01 00:00:00'
  },
  {
    id: '3',
    title: '我是标题',
    desc: '我的内容很长我的内容很长我的内容很长我的内容很长我的内容很长我的内容很长我的内容很长我的内容很长我的内容很长',
    time: '2022-01-01 00:00:00'
  }
]

const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props

  if (!width) {
    return <th {...restProps} />
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className='react-resizable-handle'
          onClick={(e) => {
            e.stopPropagation()
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  )
}

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      columnWidth: {
        id: 90,
        title: 140,
        desc: null,
        time: 180
      }
    }
  }

  handleResize = (columnName, event, obj) => {
    console.log('........... handleResize')
    console.log(columnName)
    console.log(event)
    console.log(obj)

    const { size } = obj
    const { width } = size && size != null ? size : {}

    let { columnWidth } = this.state
    columnWidth[columnName] = width
    this.setState({
      columnWidth: columnWidth
    })
  }

  render() {
    const { columnWidth } = this.state
    return (
      <div style={{ padding: 16 }}>
        <Table
          components={{
            header: {
              cell: ResizableTitle
            }
          }}
          loading={false}
          dataSource={dataSource}
          // primaryKey={'id'}
          rowKey={'id'}
          isShowPagination={false}
          currentPage={1}
          tableTotalRecord={dataSource.length}
          tablePagesize={12}
          paginationOnChange={() => {}}
          tableOnChange={(selectedRowKeys, selectedRows) => {
            console.log('.......... tableOnChange')
          }}
          // tableSelectionMode={TableSelectionMode.TableSelectionModeNone}
          onSort={() => {}}
          selectedRowKeys={[]}
          onResizeChange={this.handleTableOnResizeChange}
          tableOnRowClick={(index, record, e) => {
            console.log('............. row onClick')
            console.log(index)
          }}
        >
          <Table.Column
            title={'ID'}
            dataIndex={'id'}
            align={'left'}
            alignHeader={'left'}
            width={columnWidth['id']}
            textWrap={'word-break'}
            ellipsis={true}
            showSorterTooltip={true}
            resizable={true}
            onHeaderCell={(column) => ({
              width: columnWidth['id'],
              onResize: (event, obj) => {
                this.handleResize('id', event, obj)
              }
            })}
          />
          <Table.Column
            title={'标题'}
            dataIndex={'title'}
            align={'left'}
            alignHeader={'left'}
            width={columnWidth['title']}
            textWrap={'word-break'}
            ellipsis={true}
            showSorterTooltip={true}
            resizable={true}
            onHeaderCell={(column) => ({
              width: columnWidth['title'],
              onResize: (event, obj) => {
                this.handleResize('title', event, obj)
              }
            })}
          />

          <Table.Column
            title={'简介'}
            dataIndex={'desc'}
            align={'left'}
            alignHeader={'left'}
            width={columnWidth['desc']}
            textWrap={'word-break'}
            ellipsis={true}
            showSorterTooltip={true}
            resizable={true}
          />

          <Table.Column
            title={'时间'}
            dataIndex={'time'}
            align={'left'}
            alignHeader={'left'}
            width={columnWidth['time']}
            textWrap={'word-break'}
            ellipsis={true}
            showSorterTooltip={true}
            resizable={true}
            onHeaderCell={(column) => ({
              width: columnWidth['time'],
              onResize: (event, obj) => {
                this.handleResize('time', event, obj)
              }
            })}
          />
        </Table>

        <style>
          {`
            .react-resizable {
              position: relative;
              background-clip: padding-box;
            }
            
            .react-resizable-handle {
              position: absolute;
              right: -5px;
              bottom: 0;
              z-index: 1;
              width: 10px;
              height: 100%;
              cursor: col-resize;
            }
            `}
        </style>
      </div>
    )
  }
}
