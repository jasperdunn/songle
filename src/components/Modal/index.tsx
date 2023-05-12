import { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { FiX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import { theme } from 'common/theme'

type ModalProps = {
  isOpen: boolean
  onHide: () => void
  children: ReactNode
}
export function Modal({
  isOpen,
  onHide,
  children,
}: ModalProps): JSX.Element | null {
  useEffect(() => {
    function hideModalIfEscapeKeyPressed(
      this: Document,
      event: KeyboardEvent
    ): void {
      if (isOpen && event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
        onHide()
      }
    }

    document.addEventListener('keydown', hideModalIfEscapeKeyPressed)

    return () => {
      document.removeEventListener('keydown', hideModalIfEscapeKeyPressed)
    }
  }, [isOpen, onHide])

  const modalRootElement = document.getElementById('modal')

  if (!modalRootElement) {
    return null
  }

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <Overlay
          key="modal"
          initial="hide"
          animate="show"
          exit="hide"
          variants={{
            show: {
              opacity: 1,
              transition: { ease: 'easeInOut', duration: 0.45 },
            },
            hide: {
              opacity: 0,
              transition: { ease: 'easeIn', duration: 0.35 },
            },
          }}
          onClick={onHide}
        >
          <PositioningGroup>
            <Dialog
              key="dialog"
              initial="slideDown"
              animate="slideUp"
              exit="slideDown"
              variants={{
                slideUp: {
                  translateY: '0%',
                  transition: { ease: 'easeInOut', duration: 0.45 },
                },
                slideDown: {
                  translateY: '200%',
                  transition: { ease: 'easeIn', duration: 0.35 },
                },
              }}
              role="dialog"
            >
              <CloseButton onClick={onHide} type="button">
                <FiX size={32} color="black" />
              </CloseButton>
              <Content>{children}</Content>
            </Dialog>
          </PositioningGroup>
        </Overlay>
      ) : null}
    </AnimatePresence>,
    modalRootElement
  )
}

const Dialog = styled(motion.div)`
  background-color: ${theme.color.secondary.background};
  width: 320px;
  padding: 16px;
  max-height: 80vh;
  overflow-y: auto;

  @media ${theme.breakpointUp.tablet} {
    width: 600px;
  }
`

const PositioningGroup = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  overflow: hidden;
  height: 100%;
  width: 100%;
`

const Overlay = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  backdrop-filter: blur(6px);
`

const Content = styled.div`
  h1 {
    margin-top: 0;
  }

  p {
    font-size: 18px;
  }

  hr {
    border: none;
    border-top: 2px solid black;
  }
`
const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: 0;
  padding: 0;
  cursor: pointer;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: inherit;
`
