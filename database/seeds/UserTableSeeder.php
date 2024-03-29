<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Role;
use App\Supervisor;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $staff = new User();
        $staff->name = 'Krisna';
        $staff->department = 'Developer';
        $staff->email = 'krisna.mustikarani@difinite.com';
        $staff->password = bcrypt('adminadmin');
        $staff->leaves_available = '12';
        $staff->role_id = '1';
        $staff->manager_id = '1';
        $staff->isActivated = '1';
        $staff->save();

        $staff = new User();
        $staff->name = 'Wendy';
        $staff->department = 'Developer';
        $staff->email = 'wendy@difinite.com';
        $staff->password = bcrypt('adminadmin');
        $staff->leaves_available = '12';
        $staff->role_id = '1';
        $staff->manager_id = '1';
        $staff->isActivated = '1';
        $staff->save();

        $staff = new User();
        $staff->name = 'Maulana';
        $staff->department = 'Developer';
        $staff->email = 'mkamal.pasya@difinite.com';
        $staff->password = bcrypt('adminadmin');
        $staff->leaves_available = '12';
        $staff->role_id = '1';
        $staff->manager_id = '2';
        $staff->isActivated = '1';
        $staff->save();

        $staff = new User();
        $staff->name = 'Aulia';
        $staff->department = 'Developer';
        $staff->email = 'aulia.fitri@difinite.com';
        $staff->password = bcrypt('adminadmin');
        $staff->leaves_available = '12';
        $staff->role_id = '1';
        $staff->manager_id = '2';
        $staff->isActivated = '1';
        $staff->save();

        $staff = new User();
        $staff->name = 'Tiara';
        $staff->department = 'Developer';
        $staff->email = 'tiaramadhanty@difinite.com';
        $staff->password = bcrypt('adminadmin');
        $staff->leaves_available = '12';
        $staff->role_id = '1';
        $staff->manager_id = '2';
        $staff->isActivated = '1';
        $staff->save();

        $staff = new User();
        $staff->name = 'Rachmat';
        $staff->department = 'Developer';
        $staff->email = 'rachmat.siyamsyah@difinite.com';
        $staff->password = bcrypt('adminadmin');
        $staff->leaves_available = '12';
        $staff->role_id = '1';
        $staff->manager_id = '2';
        $staff->isActivated = '1';
        $staff->save();
        
        $staff = new User();
        $staff->name = 'Rizal';
        $staff->department = 'Developer';
        $staff->email = 'rizal.sobar@difinite.com';
        $staff->password = bcrypt('');
        $staff->leaves_available = '12';
        $staff->role_id = '1';
        $staff->manager_id = '2';
        $staff->isActivated = '1';
        $staff->save();

        $staff = new User();
        $staff->name = 'Adyo';
        $staff->department = 'Developer';
        $staff->email = 'adyo.subhodo@difinite.com';
        $staff->password = bcrypt('adminadmin');
        $staff->leaves_available = '12';
        $staff->role_id = '1';
        $staff->manager_id = '2';
        $staff->isActivated = '1';
        $staff->save();

        $staff = new User();
        $staff->name = 'Faisal';
        $staff->department = 'Developer';
        $staff->email = 'faisal.albana@difinite.com';
        $staff->password = bcrypt('adminadmin');
        $staff->leaves_available = '12';
        $staff->role_id = '1';
        $staff->manager_id = '2';
        $staff->isActivated = '1';
        $staff->save();

        $staff = new User();
        $staff->name = 'Amir';
        $staff->department = 'Developer';
        $staff->email = 'amir.munajad@difinite.com';
        $staff->password = bcrypt('adminadmin');
        $staff->leaves_available = '12';
        $staff->role_id = '1';
        $staff->manager_id = '2';
        $staff->isActivated = '1';
        $staff->save();

        $staff = new User();
        $staff->name = 'Erlangga';
        $staff->department = 'Developer';
        $staff->email = 'erlangga.laimena@difinite.com';
        $staff->password = bcrypt('adminadmin');
        $staff->leaves_available = '12';
        $staff->role_id = '1';
        $staff->manager_id = '2';
        $staff->isActivated = '1';
        $staff->save();

        $staff = new User();
        $staff->name = 'Ivan';
        $staff->department = 'Developer';
        $staff->email = 'ivan.fathurohman@difinite.com';
        $staff->password = bcrypt('adminadmin');
        $staff->leaves_available = '12';
        $staff->role_id = '1';
        $staff->manager_id = '2';
        $staff->isActivated = '1';
        $staff->save();

        $staff = new User();
        $staff->name = 'Ageng';
        $staff->department = 'Developer';
        $staff->email = 'ageng.pribadi@difinite.com';
        $staff->password = bcrypt('adminadmin');
        $staff->leaves_available = '12';
        $staff->role_id = '1';
        $staff->manager_id = '2';
        $staff->isActivated = '1';
        $staff->save(); 
        
        $spv = new User();
        $spv->name = 'Andika';
        $spv->department = 'Supervisor';
        $spv->email = 'andika.pranata@difinite.com';
        $spv->password = bcrypt('adminadmin');
        $spv->leaves_available = '12';
        $spv->role_id = '2';
        $spv->manager_id = '1';
        $spv->isActivated = '1';
        $spv->save();

        $spv = new User();
        $spv->name = 'Alex';
        $spv->department = 'Supervisor';
        $spv->email = 'alexander.arda@difinite.com';
        $spv->password = bcrypt('adminadmin');
        $spv->leaves_available = '12';
        $spv->role_id = '2';
        $spv->manager_id = '2';
        $spv->isActivated = '1';
        $spv->save();

        $spv = new User();
        $spv->name = 'Margaret';
        $spv->department = 'Supervisor';
        $spv->email = 'margaret.pratiwi@difinite.com';
        $spv->password = bcrypt('adminadmin');
        $spv->leaves_available = '12';
        $spv->role_id = '2';
        $spv->manager_id = '3';
        $spv->isActivated = '1';
        $spv->save();

        $manager = new User();
        $manager->name = 'Gde';
        $manager->department = 'Manager';
        $manager->email = 'gde.bahagia@difinite.com';
        $manager->password = bcrypt('adminadmin');
        $manager->role_id = '3';
        $manager->isActivated = '1';
        $manager->save();

        $manager = new User();
        $manager->name = 'Aries';
        $manager->department = 'Manager';
        $manager->email = 'aries.susantio@difinite.com';
        $manager->password = bcrypt('adminadmin');
        $manager->role_id = '3';
        $manager->isActivated = '1';
        $manager->save();

        // $testStaff = new User();
        // $testStaff->name = 'testStaff1';
        // $testStaff->department = 'testing';
        // $testStaff->email = 'test1@gmail.com';
        // $testStaff->password = bcrypt('adminadmin');
        // $testStaff->leaves_available = '12';
        // $testStaff->role_id = '1';
        // $testStaff->manager_id = '1';
        // $testStaff->isActivated = '1';
        // $testStaff->save();

        // $testStaff = new User();
        // $testStaff->name = 'testStaff2';
        // $testStaff->department = 'testing';
        // $testStaff->email = 'test2@gmail.com';
        // $testStaff->password = bcrypt('adminadmin');
        // $testStaff->leaves_available = '12';
        // $testStaff->role_id = '1';
        // $testStaff->manager_id = '2';
        // $testStaff->isActivated = '1';
        // $testStaff->save();

        // $testSpv = new User();
        // $testSpv->name = 'testSpv1';
        // $testSpv->department = 'testing';
        // $testSpv->email = 'testspv1@gmail.com';
        // $testSpv->password = bcrypt('adminadmin');
        // $testSpv->leaves_available = '12';
        // $testSpv->role_id = '2';
        // $testSpv->manager_id = '1';
        // $testSpv->isActivated = '1';
        // $testSpv->save();

        // $testSpv = new User();
        // $testSpv->name = 'testSpv2';
        // $testSpv->department = 'testing';
        // $testSpv->email = 'testspv2@gmail.com';
        // $testSpv->password = bcrypt('adminadmin');
        // $testSpv->leaves_available = '12';
        // $testSpv->role_id = '2';
        // $testSpv->manager_id = '2';
        // $testSpv->isActivated = '1';
        // $testSpv->save();

        // $testManager = new User();
        // $testManager->name = 'testManager';
        // $testManager->department = 'testing';
        // $testManager->email = 'manager@gmail.com';
        // $testManager->password = bcrypt('adminadmin');
        // $testManager->role_id = '3';
        // $testManager->isActivated = '1';
        // $testManager->save();

        $admin = new User();
        $admin->name = 'admin';
        $admin->department = 'Administrator';
        $admin->email = 'admin@difinite.com';
        $admin->password = bcrypt('adminadmin');
        $admin->role_id = '4';
        $admin->isActivated = '1';
        $admin->save();
    }
}
