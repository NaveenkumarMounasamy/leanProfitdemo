// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const data = [
  { name: 'Casual', value: 50, color: '#00d4bd' },
  { name: 'Earned', value: 85, color: '#ffe700' },
  { name: 'Maternity', value: 16, color: '#FFA1A1' },
  { name: 'Leave without pay', value: 20, color: '#d9d9d9' },
  { name: 'Compensatory off', value: 14, color: 'orange' }
]
const RADIAN = Math.PI / 180

const renderCustomizedLabel = props => {
  // ** Props
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill='#fff' textAnchor='middle' dominantBaseline='central'>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const LeaveDashboard = () => {
  return (
    <Card>
      <CardHeader
        title='Dashboard'
        subheaderTypographyProps={{
          sx: { color: theme => `${theme.palette.text.disabled} !important` }
        }}
      />
      <CardContent>
        <Box sx={{ height: 250 }}>
          <ResponsiveContainer>
            <PieChart style={{ direction: 'ltr' }}>
              <Pie
                data={data}
                innerRadius={50}
                dataKey='value'
                label={renderCustomizedLabel}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 4, justifyContent: 'center' }}>
          <Box
            sx={{
              mr: 6,
              display: 'flex',
              alignItems: 'center',
              '& svg': { mr: 1.5, color: '#00d4bd' }
            }}
          >
            <Icon icon='mdi:circle' fontSize='0.75rem' />
            <Typography variant='body2'>Casual</Typography>
          </Box>
          <Box
            sx={{
              mr: 6,
              display: 'flex',
              alignItems: 'center',
              '& svg': { mr: 1.5, color: '#ffe700' }
            }}
          >
            <Icon icon='mdi:circle' fontSize='0.75rem' />
            <Typography variant='body2'>Earned</Typography>
          </Box>
          <Box
            sx={{
              mr: 6,
              display: 'flex',
              alignItems: 'center',
              '& svg': { mr: 1.5, color: '#FFA1A1' }
            }}
          >
            <Icon icon='mdi:circle' fontSize='0.75rem' />
            <Typography variant='body2'>Maternity</Typography>
          </Box>
          <Box
            sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: '#d9d9d9' } }}
          >
            <Icon icon='mdi:circle' fontSize='0.75rem' />
            <Typography variant='body2'>Leave without pay</Typography>
          </Box>
          <Box
            sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: 'orange' } }}
          >
            <Icon icon='mdi:circle' fontSize='0.75rem' />
            <Typography variant='body2'>Compensatory off</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default LeaveDashboard
