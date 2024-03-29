@extends('layouts.app')
@section('content')

    <!-- BEGIN: Subheader -->
    <div class="m-subheader ">
        <div class="d-flex align-items-center">
            <div class="mr-auto">
                <h3 class="m-subheader__title m-subheader__title">
                    Hi, {{ (Auth::user()->name) }}
                </h3>
            </div>
        </div>
    </div>
    <!-- END: Subheader -->

    <div class="m-content">
        {{-- jika akun tidak aktif menampilkan alert --}}
        @if (Auth::user()->isActivated == '0')
            <script>
                alert("Your account is deactivated. Please contact administrator");
            </script>
        @endif

        {{-- tampilan manager --}}
        @if (Auth::user()->role_id == 3)
        <div class="row">
            <div class="col-lg-9">

                <!--begin::Portlet-->
                <div class="m-portlet" id="m_portlet">
                    <div class="m-portlet__head">

                        <div class="m-portlet__head-caption">
                            <div class="m-portlet__head-title">
                                <span class="m-portlet__head-icon">
                                    <i class="flaticon-calendar-2"></i>
                                </span>
                                <h3 class="m-portlet__head-text m--font-brand">
                                    Calendar of Events
                                </h3>
                            </div>
                        </div>

                        <div class="m-portlet__head-tools">
                            <ul class="m-portlet__nav"></ul>
                        </div>
                        
                    </div>

                    <div class="m-portlet__body">
                        <div id="m_calendar"></div>
                    </div>

                </div>
                <!--end::Portlet-->

            </div> {{--end div class="col-lg-9"--}}

            <div class="col-lg-3">

                <!--begin::Portlet-->
                <div class="m-portlet" id="m_portlet">

                    <div class="m-portlet__head">
                        <div class="m-portlet__head-caption">
                            <div class="m-portlet__head-title">
                                <span class="m-portlet__head-icon">
                                    <i class="flaticon-paper-plane"></i>
                                </span>
                                <h3 class="m-portlet__head-text m--font-brand">
                                    Leave Summary
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div class="m-portlet__body" style="height:660px;">
                        <div class="fc-unthemed">
                            @forelse ($leaves as $leave)
                            
                            <div class='fc-event fc-event-external fc-start m-fc-event--primary m--margin-bottom-35' data-color="m-fc-event--primary">
                                <div class="fc-title">
                                    <div class="fc-content" style="margin-top:7px;">
                                        <p style="font-size:15px; text-align:left">{{$leave->users->name}}
                                        <span style="float:right; font-size:13px;"> {{ \Carbon\Carbon::parse($leave->from)->format('d F')}} -  {{ \Carbon\Carbon::parse($leave->to)->format('d F')}}</span></p>
                                        @if ($leave->status == '2')
                                        <p style="font-size:13px;">Approved by <b>{{$leave->responded_by}}</b></p>
                                        @elseif ($leave->status == '3')
                                        <p style="font-size:13px;">Rejected by {{$leave->responded_by}}</p>
                                        @endif
                                    </div>
                                </div>
                            </div>
                            @empty
                                <div class="fc-title">
                                    <div class="fc-content" style="margin-top:7px;">
                                        <p style="font-size:15px; text-align:center; font-style:italic;">No data available..</p> 
                                    </div>
                                </div>
                            @endforelse
                        </div>
                    </div>

                </div>
                <!--end::Portlet-->

            </div> {{--end div class="col-lg-3"--}}
        </div> {{--end div class="row"--}}

        <div class="m-portlet m-portlet--mobile">
            <div class="m-portlet__head">
                <div class="m-portlet__head-caption">
                    <div class="m-portlet__head-title">
                        <span class="m-portlet__head-icon">
                                <i class="flaticon-time-3"></i>
                        </span>
                        <h3 class="m-portlet__head-text m--font-brand">
                            Waiting for Approval
                        </h3>
                    </div>
                </div>
            </div>

            @if ($message = Session::get('success'))
            <div class="alert alert-success">
                <p>{{$message}}</p>
            </div>
            @endif

            <div class="m-portlet__body">
                <!--begin: Datatable -->
                <div class="table-responsive">
                    <table class="table table-bordered m-table m-table--border-brand m-table--head-bg-brand table-hover" id="ajax_data" style="width:100%;">
                        <thead>
                        <tr>
                            <th><b>No.</b></th>
                            <th>Name</th>
                            <th>Leave Type</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Duration</th>
                            <th>Reason</th>
                            <th style="width:15%;">Action</th>
                        </tr>
                        </thead>
                    </table>
                    @if (Auth::user()->isActivated == '1')
                        @push('scripts')
                        <script>
                        $(function() {
                            $('#ajax_data').DataTable({
                                processing: true,
                                serverSide: true,
                                ajax: 'home/json',
                                dom: '<"top"f>rt<"bottom"lip><"clear">',
                                columnDefs: [{"className": "text-center", "targets": "_all"},{targets:3, render:function(data){return moment(data).format('D MMMM YYYY'); }},{targets:4, render:function(data){return moment(data).format('D MMMM YYYY'); }}],
                                columns: [
                                    { data: 'DT_RowIndex', name: 'DT_RowIndex', orderable: false, searchable: false },
                                    { data: 'name', name: 'users.name' },
                                    { data: 'leave_type', name: 'leave_type' },
                                    { data: 'from', name: 'from' },
                                    { data: 'to', name: 'to' },
                                    { data: 'duration', name: 'duration' },
                                    { data: 'reason', name: 'reason' },
                                    { data: 'action', name: 'action', orderable: false, searchable: false}
                                ]
                            });
                        });
                        </script>
                        @endpush
                    @endif
                </div>
                <!--end: Datatable -->
            </div>
        </div>
    </div> {{-- end div class="m-content" --}}

    {{-- tampilan spv --}}
    @elseif(Auth::user()->role_id == 2)
    <div class="m-portlet m-portlet--mobile">
        <div class="m-portlet__head">
            <div class="m-portlet__head-caption">
                <div class="m-portlet__head-title">
                    <span class="m-portlet__head-icon">
                            <i class="flaticon-time-3"></i>
                    </span>
                    <h3 class="m-portlet__head-text m--font-brand">
                            Waiting for Approval
                    </h3>
                </div>
            </div>
        </div>

        @if ($message = Session::get('success'))
        <div class="alert alert-success">
            <p>{{$message}}</p>
        </div>
        @endif

        <div class="m-portlet__body">
            <!--begin: Datatable -->
            <div class="table-responsive">
                <table class="table table-bordered m-table m-table--border-brand m-table--head-bg-brand table-hover" id="ajax_data" style="width:100%;">
                    <thead>
                    <tr>
                        <th><b>No.</b></th>
                        <th>Name</th>
                        <th>Leave Type</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Duration</th>
                        <th>Reason</th>
                        <th style="width:15%;">Action</th>
                    </tr>
                    </thead>
                </table>
                @if (Auth::user()->isActivated == '1')
                    @push('scripts')
                    <script>
                    $(function() {
                        $('#ajax_data').DataTable({
                            processing: true,
                            serverSide: true,
                            ajax: 'home/json',
                            dom: '<"top"f>rt<"bottom"lip><"clear">',
                            columnDefs: [{"className": "text-center", "targets": "_all"},{targets:3, render:function(data){return moment(data).format('D MMMM YYYY'); }},{targets:4, render:function(data){return moment(data).format('D MMMM YYYY'); }}],
                            columns: [
                                { data: 'DT_RowIndex', name: 'DT_RowIndex', orderable: false, searchable: false },
                                { data: 'name', name: 'users.name' },
                                { data: 'leave_type', name: 'leave_type' },
                                { data: 'from', name: 'from'},
                                { data: 'to', name: 'to' },
                                { data: 'duration', name: 'duration' },
                                { data: 'reason', name: 'reason' },
                                {data: 'action', name: 'action', orderable: false, searchable: false}
                            ]
                        });
                    });
                    </script>
                    @endpush
                @endif
            </div>
            <!--end: Datatable -->
        </div>
    </div>
    @endif
@endsection

@push('scripts')
{{-- For For the Event and Leave Record --}}
<script>                     
    var CalendarExternalEvents = function() {
        var t = function() {
                $("#m_calendar_external_events .fc-event").each(function() {
                    $(this).data("event", {
                        title: $.trim($(this).text()),
                        stick: !0,
                        className: $(this).data("color"),
                        description: ""
                    }), $(this).draggable({
                        zIndex: 999,
                        revert: !0,
                        revertDuration: 0
                    })
                })
            },
            e = function() {
                var t = moment().startOf("day"),
                    e = t.format("YYYY-MM"),
                    i = t.clone().subtract(1, "day").format("YYYY-MM-DD"),
                    r = t.format("YYYY-MM-DD"),
                    n = t.clone().add(1, "day").format("YYYY-MM-DD");
                $("#m_calendar").fullCalendar({
                    header: {
                        left: "prev,next today",
                        center: "title",
                        right: "month,agendaWeek,agendaDay,listWeek"
                    },
                    // defaultView: "listWeek",
                    eventLimit: !0,
                    navLinks: !0,
                    height: 600,
                    events: [
                {{--Year 2019--}}{
                    title: "New Year's Day",
                    start:  "2019-01-01",
                    description: "New Year's Day",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Chinese New Year",
                    start:  "2019-02-05",
                    description: "Chinese New Year",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Bali Hindu New Year",
                    start:  "2019-03-07",
                    description: "Bali Hindu New Year",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Isra Mi'raj",
                    start:  "2019-04-03",
                    description: "Isra Mi'raj",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Good Friday",
                    start:  "2019-04-19",
                    description: "Good Friday",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Labour Day",
                    start:  "2019-05-01",
                    description: "Labour Day",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Waisak Day",
                    start:  "2019-05-19",
                    description: "Waisak Day",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Ascension Day of Jesus Christ",
                    start:  "2019-05-30",
                    description: "Ascension Day of Jesus Christ",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Pancasila Day",
                    start:  "2019-06-01",
                    description: "Pancasila Day",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Lebaran Holiday",
                    start:  "2019-06-03",
                    end: "2019-06-04",
                    description: "Lebaran Holiday",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Hari Raya Idul Fitri",
                    start:  "2019-06-05",
                    end: "2019-06-06",
                    description: "Hari Raya Idul Fitri",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Lebaran Holiday",
                    start:  "2019-06-07",
                    description: "Lebaran Holiday",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Idul Adha",
                    start:  "2019-08-11",
                    description: "Idul Adha",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Independence Day",
                    start:  "2019-08-17",
                    description: "Independence Day",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Islamic New Year",
                    start:  "2019-09-01",
                    description: "Islamic New Year",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Prophet Muhammad's Birthday",
                    start:  "2019-11-09",
                    description: "Prophet Muhammad's Birthday",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Christmas Holiday",
                    start:  "2019-12-24",
                    description: "Christmas Holiday",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Christmas Day",
                    start:  "2019-12-25",
                    description: "Christmas Day",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{{--Year 2020--}}{
                    title: "New Year's Day",
                    start:  "2020-01-01",
                    description: "New Year's Day",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Chinese New Year",
                    start:  "2020-02-25",
                    description: "Chinese New Year",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Bali Hindu New Year",
                    start:  "2020-03-25",
                    description: "Bali Hindu New Year",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Isra Mi'raj",
                    start:  "2020-03-22",
                    description: "Isra Mi'raj",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Good Friday",
                    start:  "2020-04-10",
                    description: "Good Friday",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Labour Day",
                    start:  "2020-05-01",
                    description: "Labour Day",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Waisak Day",
                    start:  "2020-05-07",
                    description: "Waisak Day",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Ascension Day of Jesus Christ",
                    start:  "2020-05-21",
                    description: "Ascension Day of Jesus Christ",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Pancasila Day",
                    start:  "2020-06-01",
                    description: "Pancasila Day",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Lebaran Holiday",
                    start:  "2020-05-22",
                    description: "Lebaran Holiday",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Hari Raya Idul Fitri",
                    start:  "2020-05-24",
                    end: "2020-05-26",
                    description: "Hari Raya Idul Fitri",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Lebaran Holiday",
                    start:  "2020-05-26",
                    description: "Lebaran Holiday",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Idul Adha",
                    start:  "2020-07-31",
                    description: "Idul Adha",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Independence Day",
                    start:  "2020-08-17",
                    description: "Independence Day",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Islamic New Year",
                    start:  "2020-08-20",
                    description: "Islamic New Year",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Prophet Muhammad's Birthday",
                    start:  "2020-10-29",
                    description: "Prophet Muhammad's Birthday",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Christmas Holiday",
                    start:  "2020-12-24",
                    description: "Christmas Holiday",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                },{
                    title: "Christmas Day",
                    start:  "2020-12-25",
                    description: "Christmas Day",
                    className: "m-fc-event--danger m-fc-event--solid-light"
                }

                // show leave employee from DB     

                @foreach($leaves as $leave)
                    ,{
                    title: "{{$leave->users->name}}",
                    start:  "{{$leave->from}}",
                    end: "{{$leave->to}}T23:59:00",
                    description: "{{$leave->reason}}",
                    className: "m-fc-event--light m-fc-event--solid-success"
                    }
                @endforeach

                    ],
                    editable: !0,
                    droppable: !0,
                    drop: function(t, e, i, r) {
                        var n = $.fullCalendar.moment(t.format());
                        n.stripTime(), n.time("08:00:00");
                        var a = $.fullCalendar.moment(t.format());
                        a.stripTime(), a.time("12:00:00"), $(this).data("event").start = n, $(this).data("event").end = a, $("#m_calendar_external_events_remove").is(":checked") && $(this).remove()
                    },
                    eventRender: function(t, e) {
                        e.hasClass("fc-day-grid-event") ? (e.data("content", t.description), e.data("placement", "top"), mApp.initPopover(e)) : e.hasClass("fc-time-grid-event") ? e.find(".fc-title").append('<div class="fc-description">' + t.description + "</div>") : 0 !== e.find(".fc-list-item-title").length && e.find(".fc-list-item-title").append('<div class="fc-description">' + t.description + "</div>")
                    }
                })
            };
        return {
            init: function() {
                t(), e()
            }
        }
    }();
    jQuery(document).ready(function() {
        CalendarExternalEvents.init()
    });
</script>
@endpush