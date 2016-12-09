<template>
  <logged-page>
    <div slot="content">
      <h1>Agenda</h1>
      <div id="agenda" />
      <agendamento-modal ref="agendamentoModal"></agendamento-modal>
    </div>
    
  </logged-page>
  
</template>
<script>

import AgendamentoModal from './AgendamentoModal'
import LoggedPage from './base/LoggedPage'
import moment from 'moment'
import FullCalendar from 'fullcalendar'
import $ from 'jquery'
export default {
  mounted() {
    const ele = this;
    $('#agenda').fullCalendar({
      locale: 'pt-BR',
      minTime: '06:00:00',
      maxTime: '24:00:00',
      header: {
        left: 'prev,next,today',
        center: 'title',
        right: 'month,agendaWeek,listDay,listWeek'
      },
      selectable: true,
      navLinks: true,
      select: function(start, end, jsEvent, view) {
        ele.$refs.agendamentoModal.show({
          inicio: start, 
          fim: end
        })
      },
      eventClick: function(event, jsEvent, view) {
        console.log('event')
      },
      navLinkDayClick: function(date, jsEvent) {
        console.log(date.format())
      },
      defaultView: 'agendaWeek',
      events: [{
        id: 'créu',
        title: 'título',
        start: moment("2016-12-08 08:30", "YYYY-MM-DD HH:mm"),
        end: moment("2016-12-08 09:30", "YYYY-MM-DD HH:mm")
      },{
        id: 'créu',
        title: 'título 2',
        start: moment("2016-12-08 09:00", "YYYY-MM-DD HH:mm"),
        end: moment("2016-12-08 11:30", "YYYY-MM-DD HH:mm")
      }]

    });
  },
  components: {
    LoggedPage, AgendamentoModal
  }
}

</script>