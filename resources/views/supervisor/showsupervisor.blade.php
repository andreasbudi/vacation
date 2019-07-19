@extends('layouts.app')
@section('content')

<div class="m-content">
    <div class="m-portlet m-portlet--mobile">      
        <div class="m-portlet__head">
            <div class="m-portlet__head-caption">
                <div class="m-portlet__head-title">
                    <h3 class="m-portlet__head-text">
                        Supervisor Management
                    </h3>
                </div>
            </div>
            <div class="m-portlet__head-tools">
                <ul class="m-portlet__nav">
                    <li class="m-portlet__nav-item">
                        <div class="m-dropdown m-dropdown--inline m-dropdown--arrow m-dropdown--align-right m-dropdown--align-push" data-dropdown-toggle="hover" aria-expanded="true">
                            <button href="#" class="btn btn-accent m-btn m-btn--custom m-btn--icon m-btn--air m-btn--pill"  data-toggle="modal" data-target="#m_modal_4">Add Supervisor</button>
                            <div class="modal fade" id="m_modal_4" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-lg" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">
                                            </h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">
                                                    &times;
                                                </span>
                                            </button>
                                        </div>
                                        <form method="POST" action="{{ route('supervisor.store') }}">
                                        @csrf
                                        <div class="modal-body">
                                            <div class="form-group">
                                                <label class="form-control-label" style="color:black;">
                                                    Name please ?
                                                </label>
                                                <input id="name_supervisor" type="text" class="form-control @error('name_supervisor') is-invalid @enderror" name="name_supervisor"  required autocomplete="name_supervisor" autofocus>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal" style="color:black;">Close</button>
                                            <button type="submit" class="btn btn-sm btn-primary">{{ __('Add') }}</button>
                                        </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="m-portlet__body">
            @if ($message = Session::get('success'))
            <div class="alert alert-success">
                <p>{{$message}}</p>
            </div>
            @endif
            <!--begin: Datatable -->
            <div>
                <table class="table table-striped table-bordered" id="ajax_data" >
                    <thead>
                    <tr>
                        <th style="width:5%;"><b>No.</b></th>
                        <th style="width:40%;">Name</th>
                        <th style="width:10%;">Action</th>
                    </tr>
                </thead>
                </table>
                @push('scripts')
                <script>
                $(function() {
                    $('#ajax_data').DataTable({
                        processing: true,
                        serverSide: true,
                        ajax: 'supervisor/json',
                        dom: '<"top"f>rt<"bottom"lip><"clear">',
                        columnDefs: [{"className": "text-center", "targets": "_all"}],
                        columns: [
                            { data: 'DT_RowIndex', name: 'DT_RowIndex', orderable: false, searchable: false },
                            { data: 'name_supervisor', name: 'supervisors.name_supervisor' },
                            { data: 'action', name: 'action', orderable: false, searchable: false}
                        ]
                    });
                });
                </script>
                @endpush
            </div>
            <!--end: Datatable -->
        </div>        
    </div>
</div>
@endsection