// ** React Imports
import { useEffect, useState, useCallback } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'

// ** ThirdParty Components
import axios from 'axios'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { AvatarGroup, Button, Grid, IconButton, Popover, Tooltip } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchProjects,
  fetchUsers,
  fetchClients,
  setProject,
  deleteProject,
  getProjectDetails,
  setSelectedProject
} from 'src/store/apps/projects'
import { Icon } from '@iconify/react'
import OptionsMenu from 'src/@core/components/option-menu'
import FallbackSpinner from 'src/@core/components/spinner'
import { unwrapResult } from '@reduxjs/toolkit'
import LeaveHeader from 'src/views/leave-management/LeaveHeader'
import Toolbar from 'src/views/leave-management/toolBar'
import Dashboard from '../dashboard/Dashboard'

const LeavePolicy = () => {
  // ** States
  const [total, setTotal] = useState(0)
  const [sort, setSort] = useState('asc')

  const [rows, setRows] = useState([
    {
      id: 1,
      title: 'Casual',
      count: 12
    },
    {
      id: 2,
      title: 'Sick',
      count: 5
    },
    {
      id: 3,
      title: 'Maternity ',
      count: 3
    },
    {
      id: 4,
      title: 'Compensatory off',
      count: 10
    }
  ])
  const [isLoading, setLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [sortColumn, setSortColumn] = useState('name')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })
  const dispatch = useDispatch()
  const store = useSelector(state => state.projects)

  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchClients())
    dispatch(fetchProjects())
      .then(unwrapResult)
      .then(() => {
        setLoading(false)
      })
  }, [dispatch, searchValue, sort, sortColumn])

  const columns = [
    {
      flex: 0.05,
      field: 'id',
      minWidth: 80,
      headerName: 'Id'
    },
    {
      flex: 0.35,
      field: 'title',
      headerName: 'Title'
    },
    {
      flex: 0.2,
      minWidth: 120,
      headerName: 'Count',
      field: 'count'
    }
  ]

  const handleSortModel = newModel => {
    if (newModel.length) {
      setSort(newModel[0].sort)
      setSortColumn(newModel[0].field)
      fetchTableData(newModel[0].sort, searchValue, newModel[0].field)
    } else {
      setSort('asc')
      setSortColumn('full_name')
    }
  }

  // ** renders client column
  const renderUsers = params => {
    const stateNum = Math.floor(Math.random() * 6)
    const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
    const color = states[stateNum]
    const user = store.users?.find(o => o.id === params.userId)
    const fullName = `${user?.firstName} ${user?.lastName}`

    return (
      <CustomAvatar
        skin='light'
        color={color}
        sx={{ mr: 1, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}
      >
        {getInitials(fullName ? fullName : 'Unkown User')}
      </CustomAvatar>
    )
  }

  const handleSearch = value => {
    setSearchValue(value)
    fetchTableData(sort, value, sortColumn)
  }

  const handleProjectSelection = data => {
    console.log('row', data)
    dispatch(getProjectDetails(data.row.uniqueId))
    dispatch(setSelectedProject(data.row))
  }

  return (
    <>
      {isLoading ? (
        <FallbackSpinner />
      ) : (
        <>
          <Card>
            <DataGrid
              autoHeight
              pagination
              rows={rows}
              rowCount={rows.length}
              columns={columns}
              sortingMode='server'
              rowSelection={false}
              onRowClick={handleProjectSelection}
              pageSizeOptions={[5, 10, 25, 50, 100]}
              paginationModel={paginationModel}
              onSortModelChange={handleSortModel}
              slots={{
                toolbar: () => {
                  return <Toolbar isExport />
                }
              }}
              onPaginationModelChange={setPaginationModel}
              loading={rows.length === 0}
              slotProps={{
                baseButton: {
                  variant: 'outlined'
                },
                toolbar: {
                  value: searchValue,
                  clearSearch: () => handleSearch(''),
                  onChange: event => handleSearch(event.target.value)
                }
              }}
              className='no-border'
            />
          </Card>
        </>
      )}
    </>
  )
}

export default LeavePolicy
