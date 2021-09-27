import React from 'react'
import html2canvas from 'html2canvas'

import {
  Box,
  Paper,
  Grid,
  Avatar,
  Typography,
  Divider,
  Button
} from '@material-ui/core'
export const Pdf = () => {
  const isMobile = () => {
    return (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/BlackBerry/i)
    )
  }

  // SACAR SCREENSHOT Y PASARLO A PDF
  const createPdf = () => {
    // CUALQUIER ITEM QUE NO DESEO QUE APAREZCA
    // LE DOY LA CLASE "removeFromPdf";
    const removeFormPdf = () => {
      document
        .querySelectorAll('.removeFormPdf')
        .forEach((elem) => (elem, elem.remove()))
    }
    let screenShot = document.querySelector('.pdf')
    if (isMobile()) {
      removeFormPdf()
      html2canvas(screenShot).then((canvas) => {
        let pdf = window.open('', '_self')
        pdf.document.write(
          "<img style='width:100%; height:auto;' src='" +
            canvas.toDataURL() +
            "'/>"
        )
        setTimeout(() => {
          pdf.print()
          window.onafterprint(pdf.location.reload())
        }, 500)
      })
    } else {
      removeFormPdf()
      html2canvas(screenShot).then((canvas) => {
        let pdf = window.open(
          '',
          '_blank',
          'width=600,height=400,left=50,top=50, toolbar=yes'
        )
        pdf.document.write(
          "<img style='width:100%; height:auto;' src='" +
            canvas.toDataURL() +
            "'/>"
        )
        setTimeout(() => {
          pdf.print()
          pdf.close()
          window.onafterprint(window.location.reload())
        }, 500)
      })
    }
  }
  return (
      <Paper style={{ width: '100%', minHeight: '100vh' }} className='pdf'>
        <Grid
          className='header-pdf'
          container
          xs={12}
          justifyContent='space-between'
          alignItems='center'
          style={{ padding: '10px 20px' }}
        >
          <Grid container xs={3} direction='column' alignItems='flex-start'>
            <Avatar
              alt='nombre municipio'
              style={{ width: '120px', height: '120px' }}
              src='minasgerais.png'
            />
          </Grid>
          <Grid container xs={9} direction='column' alignItems='flex-end'>
            <Grid className='municipality-pdf'>
              <Typography variant='h6' color='initial'>
                Governo do Estado de Minas Gerais
              </Typography>
            </Grid>
            <Grid
              item
              container
              direction='column'
              alignItems='flex-end'
              className='areas-pdf'
            >
              <Typography variant='p' color='initial'>
                Secretaria de Estado de Agricultura, Pecuária e Abastecimento
              </Typography>
              <Typography variant='p' color='initial'>
                Subsecretaria de Assuntos Fundiários
              </Typography>
              <Typography variant='p' color='initial'>
                Superintendência de Regularização Fundiária
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Divider variant='middle' />
        <Grid style={{ padding: '10px 20px' }} className='body-pdf'>
          <Grid style={{ margin: '15px 0px' }}>
            <Typography variant='h6' color='initial'>
              Cadastro do beneficiário requerimiento de medição
            </Typography>
          </Grid>
          <Grid className='section-pdf'>
            <Grid container alignItems='center' className='title-section-pdf'>
              <Typography variant='subtitle1' color='initial'>
                Dados Pessoais
              </Typography>
            </Grid>
            <Typography variant='p' color='initial'>
              Nome:
            </Typography>
            <Typography variant='body2' color='initial'>
              Lucio Damian Holzman
            </Typography>
          </Grid>
        </Grid>
      <Button onClick={() => createPdf()}>pdf</Button>
      </Paper>
  )
}
