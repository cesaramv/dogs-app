import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/app.reducer';
import { getBreedsImagesList, getBreedsList, getLoading, getSubBreedsImagesList } from 'src/store/selectors/breeds.selectors';
import * as actionsBreeds from 'src/store/actions/breeds.actions';
import * as actionsBreedsImages from 'src/store/actions/breeds-images.actions';
import * as actionsSubBreedsImages from 'src/store/actions/sub-breeds-images.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: any;
  isForm: any;
  breeds: any;
  filteredBreeds: any;
  subBreeds = [];
  listImagesBreeds: any;
  loading$: any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select(getBreedsList).subscribe(items => {
      this.breeds = items;
      this.filteredBreeds = items;
    });
    this.store.select(getBreedsImagesList).subscribe(items => {
      this.listImagesBreeds = items;
    });
    this.store.select(getSubBreedsImagesList).subscribe(items => {
      this.listImagesBreeds = items;
    });
    this.loading$ = this.store.select(getLoading);
    this.store.dispatch(actionsBreeds.loadBreeds({ filtros: {} }));
    this.formInit();
  }

  private formInit(params?: any) {
    this.isForm = Promise.resolve(
      this.form = this.formBuilder.group({
        breeds: [params ? params.name : null],
        subBreeds: [params ? params.specialCity : null]
      })
    );

    this.form.controls.breeds.valueChanges.subscribe((x: any) => {
      this.filteredBreeds = this._filter(typeof x === 'object' ? x.breed : x);
      this.form.controls.subBreeds.setValue(null, {emitEvent: false});
      this.listImagesBreeds = null;
      this.subBreeds = [];
      if (typeof x === 'object') {
        this.store.dispatch(actionsBreedsImages.loadBreedsImages({ filtros: { breed: x.breed } }));
      }
    });

    this.form.controls.subBreeds.valueChanges.subscribe((x: any) => {
      if (x) {
        const _form = this.form.getRawValue();
        const filtros = {
          breed: _form.breeds.breed,
          subbreed: x
        };
        this.store.dispatch(actionsSubBreedsImages.loadSubBreedsImages({ filtros }));
      }
    });
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.breeds.filter((street: any) => this._normalizeValue(street.breed).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  displayProperty(event: any) {
    return event ? event.breed : '';
  }
}
