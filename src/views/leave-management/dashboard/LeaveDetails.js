// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'
import Remainings from 'src/views/leave-management/dashboard/Remainings'
import { Icon } from '@iconify/react'
import { CardHeader, Grid } from '@mui/material'
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

const LeaveDetails = () => {
  return (
    <Card>
      <CardHeader
        title='Remaining Leaves'
        subheaderTypographyProps={{
          sx: { color: theme => `${theme.palette.text.disabled} !important` }
        }}
      />
      <CardContent sx={{ overflow: 'auto' }}>
        <Grid container spacing={4} sx={{ height: 320 }}>
          <Grid item xs={6} sm={6}>
            <Remainings
              stats='11'
              color='error'
              title='Casual'
              trendNumber='+25%'
              subtitle='Regional Logistics'
              icon={<Icon icon='mdi:truck-outline' />}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <Remainings
              stats='6'
              color='warning'
              title='Earned'
              trend='negative'
              trendNumber='-8%'
              subtitle='System Bugs'
              icon={<Icon icon='mdi:check' />}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <Remainings
              stats='20'
              color='warning'
              title='Maternity '
              trend='negative'
              trendNumber='-8%'
              subtitle='System Bugs'
              icon={<Icon icon='mdi:check' />}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <Remainings
              stats='13'
              color='warning'
              title='Compensatory off'
              trend='negative'
              trendNumber='-8%'
              subtitle='System Bugs'
              icon={<Icon icon='mdi:check' />}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default LeaveDetails
