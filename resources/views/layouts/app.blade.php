<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Difinite') }}</title>

    <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js"></script>
    <script>
      WebFont.load({
        google: {"families":["Poppins:300,400,500,600,700","Roboto:300,400,500,600,700"]},
        active: function() {
            sessionStorage.fonts = true;
        }
      });
    </script>
    <link href="../../assets/vendors/custom/fullcalendar/fullcalendar.bundle.css" rel="stylesheet" type="text/css" />
    <!--end::Page Vendors -->
    <link href="../../assets/vendors/base/vendors.bundle.css" rel="stylesheet" type="text/css" />
    <link href="../../assets/demo/default/base/style.bundle.css" rel="stylesheet" type="text/css" />
    <!--end::Base Styles -->
    <link rel="shortcut icon" href="../../assets/demo/default/media/img/logo/favicon.ico" />

    {{-- <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet"> --}}

 
</head>
<body class="m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default"  >
		<!-- begin:: Page -->
		<div class="m-grid m-grid--hor m-grid--root m-page">
			<!-- BEGIN: Header -->
			<header class="m-grid__item    m-header "  data-minimize-offset="200" data-minimize-mobile-offset="200" >
				<div class="m-container m-container--fluid m-container--full-height">
					<div class="m-stack m-stack--ver m-stack--desktop">
						<!-- BEGIN: Brand -->
						<div class="m-stack__item m-brand  m-brand--skin-dark ">
							<div class="m-stack m-stack--ver m-stack--general">
								<div class="m-stack__item m-stack__item--middle m-brand__logo">
									<a href="/home" class="m-brand__logo-wrapper">
										<img alt="" src="../../assets/demo/default/media/img/logo/logo_default_dark.png"/>
									</a>
								</div>
								<div class="m-stack__item m-stack__item--middle m-brand__tools">
									<!-- BEGIN: Left Aside Minimize Toggle -->
									<a href="javascript:;" id="m_aside_left_minimize_toggle" class="m-brand__icon m-brand__toggler m-brand__toggler--left m--visible-desktop-inline-block ">
										<span></span>
									</a>
									<!-- END -->
									<!-- BEGIN: Responsive Aside Left Menu Toggler -->
									<a href="javascript:;" id="m_aside_left_offcanvas_toggle" class="m-brand__icon m-brand__toggler m-brand__toggler--left m--visible-tablet-and-mobile-inline-block">
										<span></span>
									</a>
									<!-- END -->
								
									<!-- BEGIN: Topbar Toggler -->
									<a id="m_aside_header_topbar_mobile_toggle" href="javascript:;" class="m-brand__icon m--visible-tablet-and-mobile-inline-block">
										<i class="flaticon-more"></i>
									</a>
									<!-- BEGIN: Topbar Toggler -->
								</div>
							</div>
						</div>
						<!-- END: Brand -->
						<div class="m-stack__item m-stack__item--fluid m-header-head" id="m_header_nav">
							<!-- BEGIN: Horizontal Menu -->
							<button class="m-aside-header-menu-mobile-close  m-aside-header-menu-mobile-close--skin-dark " id="m_aside_header_menu_mobile_close_btn">
								<i class="la la-close"></i>
							</button>
						
							<!-- END: Horizontal Menu -->
							<!-- BEGIN: Topbar -->
							<div id="m_header_topbar" class="m-topbar  m-stack m-stack--ver m-stack--general">
								<div class="m-stack__item m-topbar__nav-wrapper">
									<ul class="m-topbar__nav m-nav m-nav--inline">
										
										<li class="m-nav__item m-topbar__notifications m-topbar__notifications--img m-dropdown m-dropdown--large m-dropdown--header-bg-fill m-dropdown--arrow m-dropdown--align-center 	m-dropdown--mobile-full-width" data-dropdown-toggle="click" data-dropdown-persistent="true">
											<a href="#" class="m-nav__link m-dropdown__toggle" id="m_topbar_notification_icon">
												<span class="m-nav__link-badge m-badge m-badge--dot m-badge--dot-small m-badge--danger"></span>
												<span class="m-nav__link-icon">
													<i class="flaticon-music-2"></i>
												</span>
											</a>
											<div class="m-dropdown__wrapper" style="width:295px;">
												{{-- <span class="m-dropdown__arrow m-dropdown__arrow--center"></span> --}}
												<div class="m-dropdown__inner">
													<div class="m-dropdown__header m--align-center" style="background: url(../../assets/app/media/img/misc/notification_bg.jpg); background-size: cover;">
														<span class="m-dropdown__header-title">
															9 New
														</span>
														<span class="m-dropdown__header-subtitle">
															User Notifications
														</span>
													</div>
													<div class="m-dropdown__body">
														<div class="m-dropdown__content">
                                                            <div class="m-list-timeline__items">
                                                                <div class="m-list-timeline__item">
                                                                    <span class="m-list-timeline__badge m-list-timeline__badge--state1-success"></span>
                                                                    <a href="" class="m-list-timeline__text">
                                                                        New order received
                                                                    </a>
                                                                    <span class="m-list-timeline__time">
                                                                        Just now
                                                                    </span>
                                                                </div>
                                                                <div class="m-list-timeline__item">
                                                                    <span class="m-list-timeline__badge m-list-timeline__badge--state1-danger"></span>
                                                                    <a href="" class="m-list-timeline__text">
                                                                        New invoice received
                                                                    </a>
                                                                    <span class="m-list-timeline__time">
                                                                        20 mins
                                                                    </span>
                                                                </div>
                                                            </div>
														</div>
													</div>
												</div>
											</div>
										</li>
										
										<li class="m-nav__item m-topbar__user-profile m-topbar__user-profile--img  m-dropdown m-dropdown--medium m-dropdown--arrow m-dropdown--header-bg-fill m-dropdown--align-right m-dropdown--mobile-full-width m-dropdown--skin-light" data-dropdown-toggle="click">
											<a href="#" class="m-nav__link m-dropdown__toggle">
												<span class="m-topbar__userpic">
													<img src="../../assets/app/media/img/users/user4.jpg" class="m--img-rounded m--marginless m--img-centered" alt=""/>
												</span>
												<span class="m-topbar__username m--hide">
													Nick
												</span>
											</a>
											<div class="m-dropdown__wrapper" style="width:295px;">
												<span class="m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust"></span>
												<div class="m-dropdown__inner">
													<div class="m-dropdown__header m--align-center" style="background: url(../../assets/app/media/img/misc/user_profile_bg.jpg); background-size: cover;">
														<div class="m-card-user m-card-user--skin-dark">
															<div class="m-card-user__pic">
																<img src="../../assets/app/media/img/users/user4.jpg" class="m--img-rounded m--marginless" alt=""/>
															</div>
															<div class="m-card-user__details">
																<span class="m-card-user__name m--font-weight-500">
																	{{-- {{{ (Auth::user()->name) }}} --}}
																</span>
															</div>
														</div>
													</div>
													<div class="m-dropdown__body">
														<div class="m-dropdown__content">
															<ul class="m-nav m-nav--skin-light">
																<li class="m-nav__section m--hide">
																	<span class="m-nav__section-text">
																		Section
																	</span>
																</li>
																<li class="m-nav__item">
																	<a href="/profile" class="m-nav__link">
																		<i class="m-nav__link-icon flaticon-profile-1"></i>
																		<span class="m-nav__link-title">
																			<span class="m-nav__link-wrap">
																				<span class="m-nav__link-text">
																					My Profile
																				</span>
																				<span class="m-nav__link-badge">
																					{{-- <span class="m-badge m-badge--success">
																						2
																					</span> --}}
																				</span>
																			</span>
																		</span>
																	</a>
																</li>
														
																<li class="m-nav__separator m-nav__separator--fit"></li>
																<li class="m-nav__item">
																	<a href="{{ route('logout')}}" class="btn m-btn--pill    btn-secondary m-btn m-btn--custom m-btn--label-brand m-btn--bolder">
																		Logout
																	</a>
																</li>
															</ul>
														</div>
													</div>
												</div>
											</div>
										</li>
								
									</ul>
								</div>
							</div>
							<!-- END: Topbar -->
						</div>
					</div>
				</div>
			</header>
			<!-- END: Header -->
			<!-- begin::Body -->
			<div class="m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body">
				<!-- BEGIN: Left Aside -->
				<button class="m-aside-left-close  m-aside-left-close--skin-dark " id="m_aside_left_close_btn">
					<i class="la la-close"></i>
				</button>
				<div id="m_aside_left" class="m-grid__item	m-aside-left  m-aside-left--skin-dark ">
					<!-- BEGIN: Aside Menu -->
					<div 
		id="m_ver_menu" 
		class="m-aside-menu  m-aside-menu--skin-dark m-aside-menu--submenu-skin-dark " 
		data-menu-vertical="true"
		 data-menu-scrollable="false" data-menu-dropdown-timeout="500"  
		>
						<ul class="m-menu__nav  m-menu__nav--dropdown-submenu-arrow ">

							@if (Auth::user()->role_id == '1')
							<li class="m-menu__item  m-menu__item" aria-haspopup="true" >
								<a href="/home" class="m-menu__link ">
									<i class="m-menu__link-icon fa fa-glass"></i>
									<span class="m-menu__link-title">
										<span class="m-menu__link-wrap">
											<span class="m-menu__link-text">
												Dashboard
											</span>
										
										</span>
									</span>
								</a>
                            </li>
                            <li class="m-menu__item  m-menu__item" aria-haspopup="true" >
								<a  href="{{ route('leave.create')}}" class="m-menu__link ">
									<i class="m-menu__link-icon flaticon-interface-7"></i>
									<span class="m-menu__link-title">
										<span class="m-menu__link-wrap">
											<span class="m-menu__link-text">
												Apply Form
											</span>
										
										</span>
									</span>
								</a>
                            </li>
                            <li class="m-menu__item  m-menu__item" aria-haspopup="true" >
								<a  href="{{route('leave.index')}}" class="m-menu__link ">
									<i class="m-menu__link-icon flaticon-folder"></i>
									<span class="m-menu__link-title">
										<span class="m-menu__link-wrap">
											<span class="m-menu__link-text">
												My Leaves History
											</span>
									
										</span>
									</span>
								</a>
							</li>

							@elseif (Auth::user()->role_id == '2')
							<li class="m-menu__item  m-menu__item" aria-haspopup="true" >
									<a href="/home" class="m-menu__link ">
										<i class="m-menu__link-icon fa fa-glass"></i>
										<span class="m-menu__link-title">
											<span class="m-menu__link-wrap">
												<span class="m-menu__link-text">
													Dashboard
												</span>
											
											</span>
										</span>
									</a>
							</li>
							<li class="m-menu__item  m-menu__item" aria-haspopup="true" >
								<a  href="{{ route('leave.create')}}" class="m-menu__link ">
									<i class="m-menu__link-icon flaticon-interface-7"></i>
									<span class="m-menu__link-title">
										<span class="m-menu__link-wrap">
											<span class="m-menu__link-text">
												Apply Form
											</span>
										
										</span>
									</span>
								</a>
							</li>
							<li class="m-menu__item  m-menu__item" aria-haspopup="true" >
								<a  href="{{route('leave.index')}}" class="m-menu__link ">
									<i class="m-menu__link-icon flaticon-folder"></i>
									<span class="m-menu__link-title">
										<span class="m-menu__link-wrap">
											<span class="m-menu__link-text">
												My Leaves History
											</span>
									
										</span>
									</span>
								</a>
							</li>
							<li class="m-menu__item  m-menu__item" aria-haspopup="true" >
								<a  href="{{route('approval.index')}}" class="m-menu__link ">
									<i class="m-menu__link-icon flaticon-folder"></i>
									<span class="m-menu__link-title">
										<span class="m-menu__link-wrap">
											<span class="m-menu__link-text">
												Approval
											</span>
									
										</span>
									</span>
								</a>
							</li>

							@elseif (Auth::user()->role_id == '3')
							<li class="m-menu__item  m-menu__item" aria-haspopup="true" >
									<a  href="{{route('approval.index')}}" class="m-menu__link ">
										<i class="m-menu__link-icon flaticon-folder"></i>
										<span class="m-menu__link-title">
											<span class="m-menu__link-wrap">
												<span class="m-menu__link-text">
													Approval
												</span>
										
											</span>
										</span>
									</a>
								</li>

							@else
							<li class="m-menu__item  m-menu__item" aria-haspopup="true" >
								<a  href="{{ route('employee.create')}}" class="m-menu__link ">
									<i class="m-menu__link-icon la la-user-plus"></i>
									<span class="m-menu__link-title">
										<span class="m-menu__link-wrap">
											<span class="m-menu__link-text">
												Add Employee
											</span>
									
										</span>
									</span>
								</a>
							</li>
							@endif
							
							
						</ul>
					</div>
					<!-- END: Aside Menu -->
				</div>
				<!-- END: Left Aside -->
				<div class="m-grid__item m-grid__item--fluid m-wrapper">
										<!-- BEGIN: Subheader -->
										<div class="m-subheader ">
												<div class="d-flex align-items-center">
													<div class="mr-auto">
														<h3 class="m-subheader__title ">
															{{-- Hi, {{{ (Auth::user()->name) }}} --}}
														</h3>
													</div>
												
												</div>
											</div>
											<!-- END: Subheader -->
					<div class="m-content">
						<!--Begin::Main Portlet-->
						<div class="row">
                            <div id="app">    
                                <main>
                                    @yield('content')
                                </main>
                            </div>
						</div>
					</div>
				</div>
			</div>
			<!-- end:: Body -->
			<!-- begin::Footer -->
			<footer class="m-grid__item		m-footer ">
				<div class="m-container m-container--fluid m-container--full-height m-page__container">
					<div class="m-stack m-stack--flex-tablet-and-mobile m-stack--ver m-stack--desktop">
						
					</div>
				</div>
			</footer>
			<!-- end::Footer -->
		</div>
		<!-- end:: Page -->

		<!-- begin::Scroll Top -->
		<div class="m-scroll-top m-scroll-top--skin-top" data-toggle="m-scroll-top" data-scroll-offset="500" data-scroll-speed="300">
			<i class="la la-arrow-up"></i>
		</div>

        <script src="../../assets/vendors/base/vendors.bundle.js" type="text/javascript"></script>
        <script src="../../assets/demo/default/base/scripts.bundle.js" type="text/javascript"></script>
		<script src="../../assets/vendors/custom/fullcalendar/fullcalendar.bundle.js" type="text/javascript"></script>
		<script src="../../assets/demo/default/custom/components/calendar/basic.js" type="text/javascript"></script>
	</body>
	<!-- end::Body -->
</html>
