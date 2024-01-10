import VueDomResizeObserver from '@easytable/common/comps/resize-observer'
import emitter from '@easytable/common/mixins/emitter'
import { clsName, getDomResizeObserverCompKey } from '../util'
import { COMPS_NAME, EMIT_EVENTS } from '../util/constant'
import HeaderTh from './header-th'

export default {
  name: COMPS_NAME.VE_TABLE_THADER_TR,
  mixins: [emitter],
  props: {
    columnsOptionResetTime: {
      type: Number,
      default: 0,
    },
    // group columns item
    groupColumn: {
      type: Array,
      required: true,
    },
    headerRows: {
      type: Array,
      default() {
        return []
      },
    },
    colgroups: {
      type: Array,
      required: true,
    },
    fixedHeader: {
      type: Boolean,
      required: true,
    },
    isGroupHeader: {
      type: Boolean,
      required: true,
    },
    rowIndex: {
      type: Number,
      required: true,
    },
    cellSelectionData: {
      type: Object,
      default() {
        return null
      },
    },
    // cell selection range data
    cellSelectionRangeData: {
      type: Object,
      default() {
        return null
      },
    },
    headerIndicatorColKeys: {
      type: Object,
      default() {
        return null
      },
    },
    // checkbox option
    checkboxOption: {
      type: Object,
      default() {
        return null
      },
    },
    // sort option
    sortOption: {
      type: Object,
      default() {
        return null
      },
    },
    // sort columns
    sortColumns: {
      type: Object,
      default() {
        return null
      },
    },
    // cell style option
    cellStyleOption: {
      type: Object,
      default() {
        return null
      },
    },
    // event custom option
    eventCustomOption: {
      type: Object,
      default() {
        return null
      },
    },
  },
  methods: {
    // tr height change
    trHeightChange({ height }) {
      this.dispatch(
        COMPS_NAME.VE_TABLE,
        EMIT_EVENTS.HEADER_ROW_HEIGHT_CHANGE,
        {
          rowIndex: this.rowIndex,
          height,
        },
      )
    },
    // click
    rowClick(e, fn) {
      fn && fn(e)
    },
    // dblclick
    rowDblclick(e, fn) {
      fn && fn(e)
    },
    // contextmenu
    rowContextmenu(e, fn) {
      fn && fn(e)
    },
    // mouseenter
    rowMouseenter(e, fn) {
      fn && fn(e)
    },
    // mouseleave
    rowMouseleave(e, fn) {
      fn && fn(e)
    },
    // mousemove
    rowMousemove(e, fn) {
      fn && fn(e)
    },
    // mouseover
    rowMouseover(e, fn) {
      fn && fn(e)
    },
    // mousedown
    rowMousedown(e, fn) {
      fn && fn(e)
    },
    // mouseup
    rowMouseup(e, fn) {
      fn && fn(e)
    },
  },
  render() {
    const {
      groupColumn,
      colgroups,
      headerRows,
      fixedHeader,
      rowIndex,
      trHeightChange,
      checkboxOption,
      sortOption,
      sortColumns,
      cellStyleOption,
      eventCustomOption,
      cellSelectionData,
    } = this

    // custom on cell event
    let customEvents = {}
    if (eventCustomOption) {
      const { headerRowEvents } = eventCustomOption
      customEvents = headerRowEvents ? headerRowEvents({ rowIndex }) : {}
    }

    const {
      click,
      dblclick,
      contextmenu,
      mouseenter,
      mouseleave,
      mousemove,
      mouseover,
      mousedown,
      mouseup,
    } = customEvents

    const events = {
      click: (e) => {
        this.rowClick(e, click)
      },
      dblclick: (e) => {
        this.rowDblclick(e, dblclick)
      },
      contextmenu: (e) => {
        this.rowContextmenu(e, contextmenu)
      },
      mouseenter: (e) => {
        this.rowMouseenter(e, mouseenter)
      },
      mouseleave: (e) => {
        this.rowMouseleave(e, mouseleave)
      },
      mousemove: (e) => {
        this.rowMousemove(e, mousemove)
      },
      mouseover: (e) => {
        this.rowMouseover(e, mouseover)
      },
      mousedown: (e) => {
        this.rowMousedown(e, mousedown)
      },
      mouseup: (e) => {
        this.rowMouseup(e, mouseup)
      },
    }

    const trProps = {
      key: getDomResizeObserverCompKey(
        rowIndex,
        this.columnsOptionResetTime,
      ),
      class: clsName('header-tr'),
      tagName: 'tr',
      on: {
        'on-dom-resize-change': trHeightChange,
      },
      nativeOn: events,
    }

    return (
      <VueDomResizeObserver {...trProps}>
        {groupColumn.map((groupColumnItem) => {
          // th props
          const thProps = {
            key: groupColumnItem.key,
            groupColumn,
            groupColumnItem,
            colgroups,
            headerRows,
            fixedHeader,
            isGroupHeader: this.isGroupHeader,
            rowIndex,
            checkboxOption,
            sortOption,
            sortColumns,
            cellStyleOption,
            eventCustomOption: this.eventCustomOption,
            cellSelectionData,
            cellSelectionRangeData: this.cellSelectionRangeData,
            headerIndicatorColKeys: this.headerIndicatorColKeys,
          }

          return <HeaderTh {...thProps} />
        })}
      </VueDomResizeObserver>
    )
  },
}
