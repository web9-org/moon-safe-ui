import { type Transaction, type TransactionDetails } from '@gnosis.pm/safe-react-gateway-sdk'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import TxSummary from '@/components/transactions/TxSummary'
import TxDetails from '@/components/transactions/TxDetails'
import CreateTxInfo from '@/components/transactions/SafeCreationTx'
import { isCreationTxInfo } from '@/utils/transaction-guards'
import { useContext } from 'react'
import { BatchExecuteHoverContext } from '@/components/transactions/BatchExecuteButton/BatchExecuteHoverProvider'
import css from './styles.module.css'

interface ExpandableTransactionItemProps {
  isGrouped?: boolean
  item: Transaction
  txDetails?: TransactionDetails
}

export const ExpandableTransactionItem = ({ isGrouped = false, item, txDetails }: ExpandableTransactionItemProps) => {
  const hoverContext = useContext(BatchExecuteHoverContext)
  const isActive = hoverContext.activeHover.includes(item.transaction.id)

  return (
    <Accordion
      disableGutters
      TransitionProps={{
        mountOnEnter: false,
        unmountOnExit: true,
      }}
      elevation={0}
      defaultExpanded={!!txDetails}
      className={isActive ? css.active : undefined}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ justifyContent: 'flex-start', overflowX: 'auto' }}>
        <TxSummary item={item} isGrouped={isGrouped} />
      </AccordionSummary>

      <AccordionDetails sx={{ padding: 0 }}>
        {isCreationTxInfo(item.transaction.txInfo) ? (
          <CreateTxInfo txSummary={item.transaction} />
        ) : (
          <TxDetails txSummary={item.transaction} txDetails={txDetails} />
        )}
      </AccordionDetails>
    </Accordion>
  )
}

export default ExpandableTransactionItem
