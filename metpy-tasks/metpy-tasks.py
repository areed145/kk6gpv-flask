import time
from pymongo import MongoClient
import base64
import io
from datetime import datetime, timedelta
from siphon.simplewebservice.wyoming import WyomingUpperAir
from metpy.units import units
from metpy.plots import add_metpy_logo, add_timestamp, SkewT, Hodograph
import metpy.calc as mpcalc
from mpl_toolkits.axes_grid1.inset_locator import inset_axes
import matplotlib.pyplot as plt
import posixpath
import matplotlib as mpl
import os
if os.environ.get('DISPLAY', '') == '':
    print('no display found. Using non-interactive Agg backend')
    mpl.use('Agg')

client = MongoClient(os.environ['MONGODB_CLIENT'])
db = client.wx


def plot_skewt(df):
    # We will pull the data out of the example dataset into individual variables
    # and assign units.
    hght = df['height'].values * units.hPa
    p = df['pressure'].values * units.hPa
    T = df['temperature'].values * units.degC
    Td = df['dewpoint'].values * units.degC
    wind_speed = df['speed'].values * units.knots
    wind_dir = df['direction'].values * units.degrees
    u, v = mpcalc.wind_components(wind_speed, wind_dir)

    # Create a new figure. The dimensions here give a good aspect ratio.
    fig = plt.figure(figsize=(9, 12))
    skew = SkewT(fig, rotation=45)

    # Plot the data using normal plotting functions, in this case using
    # log scaling in Y, as dictated by the typical meteorological plot
    skew.plot(p, T, 'r')
    skew.plot(p, Td, 'g')
    skew.plot_barbs(p, u, v)
    skew.ax.set_ylim(1000, 100)
    skew.ax.set_xlim(-40, 60)

    # Calculate LCL height and plot as black dot
    lcl_pressure, lcl_temperature = mpcalc.lcl(p[0], T[0], Td[0])
    skew.plot(lcl_pressure, lcl_temperature, 'ko', markerfacecolor='black')

    # Calculate full parcel profile and add to plot as black line
    prof = mpcalc.parcel_profile(p, T[0], Td[0]).to('degC')
    skew.plot(p, prof, 'k', linewidth=2)

    # An example of a slanted line at constant T -- in this case the 0
    # isotherm
    skew.ax.axvline(0, color='c', linestyle='--', linewidth=2)

    # Add the relevant special lines
    skew.plot_dry_adiabats()
    skew.plot_moist_adiabats()
    skew.plot_mixing_lines()

    # Create a hodograph
    ax_hod = inset_axes(skew.ax, '40%', '40%', loc=2)
    h = Hodograph(ax_hod, component_range=80.)
    h.add_grid(increment=20)
    h.plot_colormapped(u, v, hght)

    return skew


def make_name(site, date, time):
    if date:
        return '{site}_{dt:%Y%m%d_%H%M}.png'.format(site=site, dt=time)
    else:
        return '{site}.svg'.format(site=site)


def generate_plot(site, date=None):

    if date:
        request_time = datetime.strptime(date, '%Y%m%d%H')
    else:
        now = datetime.utcnow() - timedelta(hours=2)
        request_time = now.replace(
            hour=(now.hour // 12) * 12, minute=0, second=0)

    # Request the data and plot
    df = WyomingUpperAir.request_data(request_time, site)
    skewt = plot_skewt(df)

    # Add the timestamp for the data to the plot
    add_timestamp(skewt.ax, request_time, y=1.02,
                  x=0, ha='left', fontsize='large')
    skewt.ax.set_title(site)
    # skewt.ax.figure.savefig(make_name(site, date, request_time))

    bio = io.BytesIO()
    skewt.ax.figure.savefig(bio, format='svg')
    bio.seek(0)
    b64 = base64.b64encode(bio.read())
    message = {}
    message['station_id'] = site
    message['sounding'] = b64
    message['timestamp'] = datetime.utcnow()
    db.soundings.replace_one({'station_id': site}, message, upsert=True)


station_list = ['OAK', 'REV', 'LKN', 'SLC', 'GJT', 'DNR', 'VBG', 'EDW',
                'DRA', 'FGZ', 'ABQ', 'AMA', 'NKX', 'TUS', 'EPZ', 'MAF', 'FWD', 'SHV', 'DRT']

if __name__ == '__main__':
    next_hour = datetime.utcnow()
    while True:
        if datetime.utcnow() >= next_hour:
            for station in station_list:
                try:
                    generate_plot(station)
                except:
                    pass
            print('got metpy')
            next_hour = datetime.utcnow() + timedelta(hours=1)
        else:
            print('skipping updates')
        time.sleep(60*10)