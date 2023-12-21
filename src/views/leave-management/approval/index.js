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
import { customToast } from 'src/helpers/helpers'
import { useTheme } from '@emotion/react'
import toast from 'react-hot-toast'

const Approval = () => {
  // ** States
  const [total, setTotal] = useState(0)
  const [sort, setSort] = useState('asc')

  const [rows, setRows] = useState([
    {
      id: 1,
      date: new Date().toDateString(),
      userName: 'Chanakya Jayabalan',
      email: 'chanakya.jayabalan@athen.tech',
      status: 'Pending',
      request: 'Permission',
      reason: 'Going Hospital',
      image: '/images/avatars/1.png',
      fromDate: new Date().toDateString(),
      toDate: new Date().toDateString()
    },
    {
      id: 2,
      request: 'Sick Leave',
      date: new Date().toDateString(),
      status: 'Pending',
      userName: 'Dhineshkumar Selvam',
      email: 'dhinesh.selvam@athen.tech',
      image: '/images/avatars/2.png',
      reason: 'Fever',
      fromDate: new Date().toDateString(),
      toDate: new Date().toDateString()
    },
    {
      id: 3,
      request: 'Casual Leave',
      date: new Date().toDateString(),
      status: 'Approved',
      userName: 'Naveenkumar Mounasamy',
      email: 'naveen.mounasamy@athen.tech',
      image: '/images/avatars/3.png',
      reason: 'Festival celeberation in hometown',
      fromDate: new Date().toDateString(),
      toDate: new Date().toDateString()
    },
    {
      id: 4,
      request: 'Work From Home',
      date: new Date().toDateString(),
      status: 'Rejected',
      userName: 'Dhivya Kumarasamy',
      email: 'dhivya.kumarasamy@athen.tech',
      image: '/images/avatars/4.png',
      reason: 'Powercut in Office',
      fromDate: new Date().toDateString(),
      toDate: new Date().toDateString()
    }
  ])
  const [isLoading, setLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [sortColumn, setSortColumn] = useState('name')

  const [respond, setRespond] = useState({
    isRejected: false,
    isApproved: false
  })
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })
  const dispatch = useDispatch()
  const store = useSelector(state => state.projects)
  const theme = useTheme()

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
      field: 'userName',
      headerName: 'User',
      renderCell: ({ row, value }) => {
        return (
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <CustomAvatar
              src={row.image}
              skin='light'
              color='primary'
              sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}
            >
              {getInitials(value ? value : 'John Doe')}
            </CustomAvatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant=''>{value}</Typography>
              <Typography variant='caption'>{row.email}</Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 120,
      headerName: 'Request',
      field: 'request'
    },
    {
      flex: 0.3,
      headerName: 'Reason',
      field: 'reason'
    },
    {
      flex: 0.175,
      minWidth: 110,
      field: 'fromDate',
      headerName: 'From Date'
    },
    {
      flex: 0.175,
      minWidth: 110,
      field: 'toDate',
      headerName: 'To Date'
    },
    {
      flex: 0.3,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      align: 'center',
      renderCell: params => (
        <Box columnGap={2} sx={{ display: 'flex', alignItems: 'center' }}>
          {params.row.status?.toLowerCase() === 'pending' ? (
            <>
              <Button
                size='small'
                variant='contained'
                onClick={handleApproval(params.row, 'Rejected')}
                color='error'
              >
                Reject
              </Button>
              <Button
                size='small'
                variant='contained'
                onClick={handleApproval(params.row, 'Approved')}
                color='success'
              >
                Approve
              </Button>
            </>
          ) : params.row.status?.toLowerCase() === 'approved' ? (
            <CustomChip size='small' label='Approved' skin='light' color='success' />
          ) : (
            <CustomChip size='small' label='Rejected' skin='light' color='error' />
          )}
        </Box>
      )
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

  //handle approval
  const handleApproval = (row, name) => e => {
    e.preventDefault()
    const _row = [...rows]
    const index = _row.findIndex(o => o.id == row.id)
    _row[index] = { ..._row[index], status: name }
    setRows(_row)
    name == 'Approved' ? toast.success('Request Approved') : toast.error('Request Rejected')
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
            <LeaveHeader title='Leave Management' />
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

export default Approval
