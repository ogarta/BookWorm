<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class MakeServiceAndRepositoryCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:serviceAndRepository {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new service and repository with the given name.';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $name = $this->argument('name');

        // Generate the service file
        if (!file_exists(app_path('Services/' .$name))) {
            mkdir(app_path('Services/' .$name), 0777, true);
        }
        $serviceFilePath = app_path('Services/' .$name. '/' .  $name . 'ServiceInterface.php');

        $stub = file_get_contents(base_path('resources/stubs/serviceInterface.stub'));
        $stub = str_replace('{{name}}', $name, $stub);

        file_put_contents($serviceFilePath, $stub);

        $serviceFilePath = app_path('Services/' .$name. '/' .  $name . 'Service.php');

        $stub = file_get_contents(base_path('resources/stubs/service.stub'));
        $stub = str_replace('{{name}}', $name, $stub);
        $stub = str_replace('{{nameVariable}}', strtolower($name), $stub);

        file_put_contents($serviceFilePath, $stub);

        // Generate the repository file
        if (!file_exists(app_path('Repositories/' .$name))) {
            mkdir(app_path('Repositories/' .$name), 0777, true);
        }
        $repositoryFilePath = app_path('Repositories/' .$name. '/' .  $name . 'RepositoryInterface.php');

        $stub = file_get_contents(base_path('resources/stubs/repositoryInterface.stub'));
        $stub = str_replace('{{name}}', $name, $stub);

        file_put_contents($repositoryFilePath, $stub);

        $repositoryFilePath = app_path('Repositories/' .$name. '/' .  $name . 'Repository.php');

        $stub = file_get_contents(base_path('resources/stubs/repository.stub'));
        $stub = str_replace('{{name}}', $name, $stub);

        file_put_contents($repositoryFilePath, $stub);

        $this->info("Service and repository created successfully.");
    }

}
