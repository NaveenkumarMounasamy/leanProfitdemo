// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import { Button, Typography } from '@mui/material'
import Link from 'next/link'
import { GridToolbarExport } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useDispatch, useSelector } from 'react-redux'
import { setApply } from 'src/store/leave-management'
import LeaveApplyForm from '../apply/LeaveApplyForm'
import { useState } from 'react'

const Toolbar = props => {
  const [isOpen, setOpen] = useState(false);

  return (
    <><Box
      sx={{
        gap: 2,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: theme => theme.spacing(2, 5, 4, 5)
      }}
    >
      <Box>
        <Typography variant="h6">Leave Management</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          sx={{ m: 4 }}
          placeholder='Search Requests' />
        <Button sx={{ m: 2 }} variant='contained' onClick={() => {
          setOpen(true)
        }}>
          Apply
        </Button>
      </Box>


    </Box>
      <LeaveApplyForm isOpen={isOpen} setOpen={setOpen} />
    </>
  )
}

export default Toolbar
